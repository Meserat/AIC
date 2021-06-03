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
import com.payroll.payrollbackend.model.Directorate;
import com.payroll.payrollbackend.repository.DirectorateRepository;


@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/directorate")
public class DirectorateController {

		@Autowired
		private DirectorateRepository DirectorateRepository;
		
		// get all employees
		@GetMapping("/list")
		public List<Directorate> getAllEmployee(){
			return DirectorateRepository.findAll();
		}
		
		// create Directorate 
		@PostMapping("/list")
		public Directorate createDirectorate(@RequestBody Directorate Directorate) {
			return DirectorateRepository.save(Directorate);
		}
	
		
		// get user by id 
		@GetMapping("/list/{id}")
		public ResponseEntity<Directorate> getDirectorateById(@PathVariable Long id) {
			Directorate Directorate = DirectorateRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("thia Directorate group  not exist with id :" + id));
			return ResponseEntity.ok(Directorate);
		}
		
		//update user 
		@PutMapping("/list/{id}")
		public ResponseEntity<Directorate> updateDirectorate(@PathVariable Long id, @RequestBody Directorate DirectorateD){
			Directorate Directorate = DirectorateRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("this Directorate group not exist with id :" + id));
			
			Directorate.setDirectorateId(DirectorateD.getDirectorateId());
			Directorate.setDirectorateName(DirectorateD.getDirectorateName());
			Directorate.setSection(DirectorateD.getSection());
					
			
			Directorate updatedDirectorate =DirectorateRepository.save(Directorate);
			return ResponseEntity.ok(updatedDirectorate);
		}
		
		//delete user
		@DeleteMapping("/list/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteDirectorate(@PathVariable Long id){
			Directorate Directorate = DirectorateRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Directorate group not  exist with id :" + id));
		   DirectorateRepository.delete(Directorate);
			Map<String, Boolean> responce = new HashMap<>();
			responce.put("Deleted", Boolean.TRUE);
			return ResponseEntity.ok(responce);
			
		}

		
}
