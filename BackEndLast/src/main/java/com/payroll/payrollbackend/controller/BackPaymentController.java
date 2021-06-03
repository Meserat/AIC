package com.payroll.payrollbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payroll.payrollbackend.exception.ResourceNotFoundException;
import com.payroll.payrollbackend.model.BackPayment;
import com.payroll.payrollbackend.repository.BackPaymentRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/backpayment")
public class BackPaymentController {
	@Autowired
	private BackPaymentRepository backPaymentRepository;
	
	// get all BackPayament

	@GetMapping("/list")
	
	public List<BackPayment> getAllBackPayament(){
		return backPaymentRepository.findAll();
		
	}
	
	// create BackPayament

	@PostMapping("/list")
	public BackPayment createBackPayament(@RequestBody BackPayment backPayament) {
		return backPaymentRepository.save(backPayament);
	}

	
	// get BackPayament by id 

	@GetMapping("/list/{id}")
	public ResponseEntity<BackPayment> getBackPayamentById(@PathVariable Long id) {
		BackPayment backPayament = backPaymentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("thia BackPayament type  not exist with id :" + id));
		return ResponseEntity.ok(backPayament);
	}
	
	//update allowance

	@PutMapping("/list/{id}")
	public ResponseEntity<BackPayment> updateBackPayament(@PathVariable Long id, @RequestBody BackPayment backPaymentD){
		BackPayment backPayment = backPaymentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("this BackPayament type not exist with id :" + id));
		
		backPayment.setBackPaymentId(backPaymentD.getBackPaymentId());
		backPayment.setNewAmount(backPaymentD.getNewAmount());
		backPayment.setPreviousAmount(backPaymentD.getPreviousAmount());
		backPayment.setDate(backPaymentD.getDate());
		backPayment.setEmployee(backPaymentD.getEmployee());
		
		BackPayment updatedBackPayment = backPaymentRepository.save(backPayment);
		return ResponseEntity.ok(updatedBackPayment);
	}
	
	//delete allowance
	
	@DeleteMapping("/list/{id}")
	public ResponseEntity<Map<String, Boolean>> deleteAllowance(@PathVariable Long id){
		BackPayment backPayment = backPaymentRepository.findById(id)
				.orElseThrow(() -> new ResourceNotFoundException("BackPayament type not  exist with id :" + id));
		backPaymentRepository.delete(backPayment);
		Map<String, Boolean> responce = new HashMap<>();
		responce.put("Deleted", Boolean.TRUE);
		return ResponseEntity.ok(responce);
		
	}



}
