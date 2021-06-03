package com.payroll.payrollbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.payroll.payrollbackend.exception.ResourceNotFoundException;
import com.payroll.payrollbackend.model.EmployeeAllowance;
import com.payroll.payrollbackend.repository.EmployeeAllowanceRepository;

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
@RequestMapping("/employee-allowance")

public class EmployeeAllowanceController {

				@Autowired
				private EmployeeAllowanceRepository employeeAllowanceRepository;
				
				// get all allowances
			
				@GetMapping("/list")
				public List<EmployeeAllowance> getAllEmployeeAllowance(){
					return employeeAllowanceRepository.findAll();
				}		
				
				// create employee allowance 
				
				@PostMapping("/list")
				public EmployeeAllowance createEmployeeAllowance(@RequestBody EmployeeAllowance employeeAllowance) {
					return employeeAllowanceRepository.save(employeeAllowance);
				}
			
				
				// get allowance  by id 
			
				@GetMapping("/list/{id}")
				public ResponseEntity<EmployeeAllowance> getEmployeeAllowanceById(@PathVariable Long id) {
					EmployeeAllowance allowance = employeeAllowanceRepository.findById(id)
							.orElseThrow(() -> new ResourceNotFoundException("thia allowance type  not exist with id :" + id));
					return ResponseEntity.ok(allowance);
				}
				
				//update employee allowance
			
				@PutMapping("/list/{id}")
				public ResponseEntity<EmployeeAllowance> updateEmployeeAllowance(@PathVariable Long id, @RequestBody EmployeeAllowance allowanceD){
					EmployeeAllowance allowance = employeeAllowanceRepository.findById(id)
							.orElseThrow(() -> new ResourceNotFoundException("this employee allowance type not exist with id :" + id));
					
					allowance.setEmployeeAllowanceId(allowanceD.getEmployeeAllowanceId());
					allowance.setEmployee(allowanceD.getEmployee());
					allowance.setAllowance(allowanceD.getAllowance());
					allowance.setAmount(allowanceD.getAmount());
					
					EmployeeAllowance updatedEmployeeAllowance =employeeAllowanceRepository.save(allowance);
					return ResponseEntity.ok(updatedEmployeeAllowance);
				}
				
				//delete employee allowance
			
				@DeleteMapping("/list/{id}")
				public ResponseEntity<Map<String, Boolean>> deleteEmployeAllowance(@PathVariable Long id){
					EmployeeAllowance allowance = employeeAllowanceRepository.findById(id)
							.orElseThrow(() -> new ResourceNotFoundException("allowance type not  exist with id :" + id));
					employeeAllowanceRepository.delete(allowance);
					Map<String, Boolean> responce = new HashMap<>();
					responce.put("Deleted", Boolean.TRUE);
					return ResponseEntity.ok(responce);
					
				}

				
}
