package com.payroll.payrollbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.payroll.payrollbackend.exception.ResourceNotFoundException;
import com.payroll.payrollbackend.model.Deduction;
import com.payroll.payrollbackend.repository.DeductionRepository;

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

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/deduction")
public class DeductionController {

					@Autowired
					private DeductionRepository deductionRepository;
					
					// get all deduction
	
					@GetMapping("/list")
					
					public List<Deduction> getAllDeduction(){
						return deductionRepository.findAll();
						
					}
					
					// create deduction
				
					@PostMapping("/list")
					public Deduction createDeduction(@RequestBody Deduction deduction) {
						return deductionRepository.save(deduction);
					}
				
					
					// get deduction by id 
		
					@GetMapping("/list/{id}")
					public ResponseEntity<Deduction> getDeductionById(@PathVariable Long id) {
						Deduction deduction = deductionRepository.findById(id)
								.orElseThrow(() -> new ResourceNotFoundException("thia deduction type  not exist with id :" + id));
						return ResponseEntity.ok(deduction);
					}
					
					//update allowance
				
					@PutMapping("/list/{id}")
					public ResponseEntity<Deduction> updateDeduction(@PathVariable Long id, @RequestBody Deduction deductionD){
						Deduction deduction = deductionRepository.findById(id)
								.orElseThrow(() -> new ResourceNotFoundException("this deduction type not exist with id :" + id));
						
						deduction.setDeductionId(deductionD.getDeductionId());
						deduction.setDeductionName(deductionD.getDeductionName());
						deduction.setDeductionType(deductionD.getDeductionType());
						
						Deduction updatedDeduction =deductionRepository.save(deduction);
						return ResponseEntity.ok(updatedDeduction);
					}
					
					//delete allowance
					
					@DeleteMapping("/list/{id}")
					public ResponseEntity<Map<String, Boolean>> deleteAllowance(@PathVariable Long id){
						Deduction deduction = deductionRepository.findById(id)
								.orElseThrow(() -> new ResourceNotFoundException("deduction type not  exist with id :" + id));
						deductionRepository.delete(deduction);
						Map<String, Boolean> responce = new HashMap<>();
						responce.put("Deleted", Boolean.TRUE);
						return ResponseEntity.ok(responce);
						
					}


}
