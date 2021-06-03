package com.payroll.payrollbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.payroll.payrollbackend.exception.ResourceNotFoundException;
import com.payroll.payrollbackend.model.EmployeeDeduction;
import com.payroll.payrollbackend.repository.EmployeeDeductionRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
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
@RequestMapping("/employee-deduction")
public class EmployeeDeductionController {

					@Autowired
					private EmployeeDeductionRepository employeeDeductionRepository;
					
					// get all allowances
//					@Secured({"ACCOUNTANT"})
					@GetMapping("/list")
					public List<EmployeeDeduction> getAllEmployeeDeduction(){
						return employeeDeductionRepository.findAll();
					}	
					
					// create employee deduction
//					@Secured({"ACCOUNTANT"})
					@PostMapping("/list")
					public  EmployeeDeduction createEmployeeDeduction(@RequestBody  EmployeeDeduction  employeeDeduction) {
						return employeeDeductionRepository.save( employeeDeduction);
					}
				
					
					// get employee deduction  by id 
//					@Secured({"ACCOUNTANT"})
					@GetMapping("/list/{id}")
					public ResponseEntity< EmployeeDeduction> getEmployeeDeductionById(@PathVariable Long id) {
						 EmployeeDeduction  employeeDeduction =  employeeDeductionRepository.findById(id)
								.orElseThrow(() -> new ResourceNotFoundException("thia allowance type  not exist with id :" + id));
						return ResponseEntity.ok( employeeDeduction);
					}
					
					//update employee allowance
//					@Secured({"ACCOUNTANT"})
					@Transactional
					@PutMapping("/list/{id}")
					public ResponseEntity< EmployeeDeduction> updateEmployeeDeduction(@PathVariable Long id, @RequestBody  EmployeeDeduction allowanceD){
						 EmployeeDeduction allowance =  employeeDeductionRepository.findById(id)
								.orElseThrow(() -> new ResourceNotFoundException("this employee deduction type not exist with id :" + id));
						
						allowance.setEmployeeDeductionId(allowanceD.getEmployeeDeductionId());
						allowance.setEmployee(allowanceD.getEmployee());
						allowance.setDeduction(allowanceD.getDeduction());
						allowance.setAmount(allowanceD.getAmount());
						
						 EmployeeDeduction updatedEmployeeDeduction =employeeDeductionRepository.save(allowance);
						return ResponseEntity.ok(updatedEmployeeDeduction);
					}
					
					//delete employee allowance
//					@Secured({"ACCOUNTANT"})
					@DeleteMapping("/list/{id}")
					public ResponseEntity<Map<String, Boolean>> deleteEmployeDeduction(@PathVariable Long id){
						EmployeeDeduction deduction = employeeDeductionRepository.findById(id)
								.orElseThrow(() -> new ResourceNotFoundException("deduction type not  exist with id :" + id));
						employeeDeductionRepository.delete(deduction);
						Map<String, Boolean> responce = new HashMap<>();
						responce.put("Deleted", Boolean.TRUE);
						return ResponseEntity.ok(responce);
						
					}

}
