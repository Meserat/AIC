package com.payroll.payrollbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.payroll.payrollbackend.exception.ResourceNotFoundException;
import com.payroll.payrollbackend.model.DeductionHistory;
import com.payroll.payrollbackend.repository.DeductionHistoryRepository;
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
@RequestMapping("/deductionHistory")
public class DeductionHistoryController {

			@Autowired
			private DeductionHistoryRepository allowanceRepository;
			
			// get all allowances
			@GetMapping("/list")
			public List<DeductionHistory> getAllAllowanceHistory(){
				return allowanceRepository.findAll();
			}		
			
			// create allowance 
			@PostMapping("/list")
			public DeductionHistory createDeductionHistory(@RequestBody DeductionHistory allowance) {
				return allowanceRepository.save(allowance);
			}
		
			
			// get allowance  by id 
			@GetMapping("/list/{id}")
			public ResponseEntity<DeductionHistory> getDeductionHistoryById(@PathVariable Long id) {
				DeductionHistory allowance = allowanceRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("thia deduction type  not exist with id :" + id));
				return ResponseEntity.ok(allowance);
			}
			
			//update allowance
			@PutMapping("/list/{id}")
			public ResponseEntity<DeductionHistory> updateDeductionHistory(@PathVariable Long id, @RequestBody DeductionHistory allowanceD){
				DeductionHistory allowance = allowanceRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("this allowance type not exist with id :" + id));
				
				allowance.setId(allowanceD.getId());
				allowance.setEmployeeId(allowanceD.getEmployeeId());
				allowance.setDeductionName(allowanceD.getDeductionName());
				allowance.setDeductionAmount(allowanceD.getDeductionAmount());
				allowance.setTime(allowanceD.getTime());
				
				DeductionHistory updatedAllowance =allowanceRepository.save(allowance);
				return ResponseEntity.ok(updatedAllowance);
			}
			
			//delete allowance
			@DeleteMapping("/list/{id}")
			public ResponseEntity<Map<String, Boolean>> deleteAllowanceHistory(@PathVariable Long id){
				DeductionHistory allowance = allowanceRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("allowance type not  exist with id :" + id));
				allowanceRepository.delete(allowance);
				Map<String, Boolean> responce = new HashMap<>();
				responce.put("Deleted", Boolean.TRUE);
				return ResponseEntity.ok(responce);
				
			}

			

}
