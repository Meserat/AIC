package com.payroll.payrollbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;



import com.payroll.payrollbackend.exception.ResourceNotFoundException;
import com.payroll.payrollbackend.model.ConfirmationToken;
import com.payroll.payrollbackend.model.Role;
import com.payroll.payrollbackend.model.User;
import com.payroll.payrollbackend.payload.ConfirmationTokenRequest;
import com.payroll.payrollbackend.payload.MessageResponse;
import com.payroll.payrollbackend.payload.SignupRequest;
import com.payroll.payrollbackend.payload.forgetPassword;
import com.payroll.payrollbackend.repository.RoleRepository;
import com.payroll.payrollbackend.repository.UserRepository;
import  com.payroll.payrollbackend.repository.ConfirmationTokenRepository;
import com.payroll.payrollbackend.service.EmailSenderService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/user")

public class UserController {
	
	@Autowired
	private ConfirmationTokenRepository confirmationTokenRepository;
	
	@Autowired
	private EmailSenderService emailSenderService;
	
	@Autowired
	private UserRepository userRepository;

	@Autowired
	private RoleRepository roleRepository;

	@Autowired
     PasswordEncoder encoder;

	// get all users
//	@Secured({"ADMIN"})
	@GetMapping("/users")
	public List<User> getAllUser(){
		return userRepository.findAll();
		}		

	// create user rest api
//	@Secured("ADMIN")
	@PostMapping("/users")
	public ResponseEntity<?> createUser(@RequestBody SignupRequest signUpRequest) {
		if (userRepository.existsByUserUserName(signUpRequest.getUserUserName())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Username is already taken!"));
		}

		if (userRepository.existsByUserEmail(signUpRequest.getUserEmail())) {
			return ResponseEntity
					.badRequest()
					.body(new MessageResponse("Error: Email is already in use!"));
		}
		System.out.println("users creating "+signUpRequest.getUserRole().getRoleName());
		// Create new user's account
		User user = new User(
			
            signUpRequest.getUserFirstName(),
            signUpRequest.getUserLastName(),
            signUpRequest.getUserUserName(),
            signUpRequest.getUserEmail(), 
            signUpRequest.getUserPhoneNumber(),
			encoder.encode(signUpRequest.getUserPassword()),			
			signUpRequest.getUserRole(), true);
	
		String strRoles = signUpRequest.getUserRole().getRoleName();
		// Set<Role> userRoles = new HashSet<>();
	
		if (strRoles == null) {
			Role admin = roleRepository.findByRoleName("ADMIN")
					.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
			user.setUserRole(admin);//userRoles.add(admin);
		} else {
			switch (strRoles) {
				case "ACCOUNTANT":
					Role acc = roleRepository.findByRoleName("ACCOUNTANT")
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					user.setUserRole(acc);//userRoles.add(acc);

					break;
				case "HR":
					Role hr = roleRepository.findByRoleName("HR")
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					user.setUserRole(hr);//userRoles.add(hr);

					break;
				default:
					Role def = roleRepository.findByRoleName("ADMIN")
							.orElseThrow(() -> new RuntimeException("Error: Role is not found."));
					user.setUserRole(def);//userRoles.add(def);
				}
		}

		
		userRepository.save(user);

		return ResponseEntity.ok(new MessageResponse("User registered successfully!"));
	}
				
	// get user by id rest api
//	@Secured("ADMIN")
	@GetMapping("/users/{id}")
	public ResponseEntity<User> getUserById(@PathVariable Long id) {
			User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
				return ResponseEntity.ok(user);
				}
				
	//update user 
//	@Secured("ADMIN")
	@PutMapping("/users/{id}")
	public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User userDetails){
	User user = userRepository.findById(id)
		.orElseThrow(() -> new ResourceNotFoundException("user not exist with id :" + id));
					
//		user.setUserId(userDetails.getUserId());
//		user.setUserFirstName(userDetails.getUserFirstName());
//		user.setUserLastName(userDetails.getUserLastName());
//		user.setUserEmail(userDetails.getUserEmail());
//		user.setUserPhoneNumber(userDetails.getUserPhoneNumber());
//		user.setUserRole(userDetails.getUserRole());
//		user.setUserUserName(userDetails.getUserUserName());
     	user.setUserPassword(encoder.encode(userDetails.getUserPassword()));
		user.setStatus(false);
				
		User updatedUser = userRepository.save(user);
		return ResponseEntity.ok(updatedUser);
		}
		
	
	
	//delete user
//	@Secured("ADMIN")
	@DeleteMapping("/users/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteUser(@PathVariable Long id){
		User user = userRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("User not exist with id :" + id));
		userRepository.delete(user);
		Map<String, Boolean> responce = new HashMap<>();
		responce.put("Deleted", Boolean.TRUE);
		return ResponseEntity.ok(responce);
					
		}
	@PostMapping("/forgot-password")
	public ResponseEntity<?> forgotUserPassword(@RequestBody forgetPassword forgetPassword) {
		System.out.println(forgetPassword.getUserEmail());
		User existingUser = userRepository.findByUserEmail(forgetPassword.getUserEmail());
		if(existingUser != null) {
			// create token
			ConfirmationToken confirmationToken = new ConfirmationToken(existingUser);
			System.out.println("not null");
			// save it
			confirmationTokenRepository.save(confirmationToken);
			
			// create the email
			SimpleMailMessage mailMessage = new SimpleMailMessage();
			mailMessage.setTo(existingUser.getUserEmail());
			mailMessage.setSubject("Complete Password Reset!");
			mailMessage.setFrom("degagawolde@gmail.com");
			mailMessage.setText("To complete the password reset process, se this code: "+confirmationToken.getConfirmationToken());
			
			emailSenderService.sendEmail(mailMessage);
			
			 return ResponseEntity.ok( new MessageResponse("Request to reset password received. Check your inbox for the reset code."));
			

		} 
		else {	
			return ResponseEntity.badRequest().body(new MessageResponse(forgetPassword.getUserEmail()+" This email does not exist!"));
		}
					
	}


	@PostMapping("/confirm-reset")
	public ResponseEntity<?> validateResetToken(@RequestBody ConfirmationTokenRequest confirmationTokenRequest)
	{
		ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationTokenRequest.getConfirmationToken());
		
		if(token != null) {
			User user = userRepository.findByUserEmail(token.getUser().getUserEmail());
			user.setUserPassword(encoder.encode(confirmationTokenRequest.getUserPassword()));
			user.setStatus(false);
//						 System.out.println(tokenUser.getPassword());
						
			userRepository.save(user);
			return ResponseEntity.ok(new MessageResponse("confirmed successfully"));
		} else {
			return ResponseEntity.badRequest().body(new MessageResponse("confirmed successfully"));
		}
	
	}	

	/**
	 * Receive the token from the link sent via email and display form to reset password
	 */
	@PostMapping("/reset-password")
	public ResponseEntity<?> resetUserPassword(@RequestBody SignupRequest signUpRequest) {
		// ConfirmationToken token = confirmationTokenRepository.findByConfirmationToken(confirmationToken);
		
		if(signUpRequest.getUserEmail() != null) {
			// use email to find user
			User tokenUser = userRepository.findByUserEmail(signUpRequest.getUserEmail());
			tokenUser.setUserPassword(encoder.encode(signUpRequest.getUserPassword()));
//			 System.out.println(tokenUser.getPassword());
			userRepository.save(tokenUser);
			return ResponseEntity.badRequest().body(new MessageResponse("reset successfully"));
			
		} else {
			return ResponseEntity.badRequest().body(new MessageResponse("reset failed"));
		}
		
	}


	public UserRepository getUserRepository() {
		return userRepository;
	}

	public void setUserRepository(UserRepository userRepository) {
		this.userRepository = userRepository;
	}

	public ConfirmationTokenRepository getConfirmationTokenRepository() {
		return confirmationTokenRepository;
	}

	public void setConfirmationTokenRepository(ConfirmationTokenRepository confirmationTokenRepository) {
		this.confirmationTokenRepository = confirmationTokenRepository;
	}

	public EmailSenderService getEmailSenderService() {
		return emailSenderService;
	}

	public void setEmailSenderService(EmailSenderService emailSenderService) {
		this.emailSenderService = emailSenderService;
	}
	
//    @Bean
//    public PasswordEncoder passwordEncoder(){
//        return new BCryptPasswordEncoder();
//    }
}
