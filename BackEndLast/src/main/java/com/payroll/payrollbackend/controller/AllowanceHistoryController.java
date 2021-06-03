package com.payroll.payrollbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.payroll.payrollbackend.exception.ResourceNotFoundException;
import com.payroll.payrollbackend.model.AllowanceHistory;
import com.payroll.payrollbackend.repository.AllowanceHistoryRepository;

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
@RequestMapping("/allowancehistory")
public class AllowanceHistoryController {

			@Autowired
			private AllowanceHistoryRepository allowanceRepository;
			
			// get all allowances
			@GetMapping("/list")
			public List<AllowanceHistory> getAllAllowanceHistory(){
				return allowanceRepository.findAll();
			}		
			
			// create allowance 
			@PostMapping("/list")
			public AllowanceHistory createAllowanceHistory(@RequestBody AllowanceHistory allowance) {
				return allowanceRepository.save(allowance);
			}
		
			
			// get allowance  by id 
			@GetMapping("/list/{id}")
			public ResponseEntity<AllowanceHistory> getAllowanceHistoryById(@PathVariable Long id) {
				AllowanceHistory allowance = allowanceRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("thia allowance type  not exist with id :" + id));
				return ResponseEntity.ok(allowance);
			}
			
			//update allowance
			@PutMapping("/list/{id}")
			public ResponseEntity<AllowanceHistory> updateAllowanceHistory(@PathVariable Long id, @RequestBody AllowanceHistory allowanceD){
				AllowanceHistory allowance = allowanceRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("this allowance type not exist with id :" + id));
				
				allowance.setId(allowanceD.getId());
				allowance.setEmployeeId(allowanceD.getEmployeeId());
				allowance.setAllowanceName(allowanceD.getAllowanceName());
				allowance.setAllowanceAmount(allowanceD.getAllowanceAmount());
				allowance.setTime(allowanceD.getTime());
				
				AllowanceHistory updatedAllowance =allowanceRepository.save(allowance);
				return ResponseEntity.ok(updatedAllowance);
			}
			
			//delete allowance
			@DeleteMapping("/list/{id}")
			public ResponseEntity<Map<String, Boolean>> deleteAllowanceHistory(@PathVariable Long id){
				AllowanceHistory allowance = allowanceRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("allowance type not  exist with id :" + id));
				allowanceRepository.delete(allowance);
				Map<String, Boolean> responce = new HashMap<>();
				responce.put("Deleted", Boolean.TRUE);
				return ResponseEntity.ok(responce);
				
			}

			

}
