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
import com.payroll.payrollbackend.model.EmployeeHistory;
import com.payroll.payrollbackend.repository.EmployeeHistoryRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/employeeHistory")
public class EmployeeHistoryController {
	
	@Autowired
	private EmployeeHistoryRepository employeeRepository;

	
	// get all employees
	@GetMapping("/list")
	public List<EmployeeHistory> getAllEmployeeHistory(){
		return employeeRepository.findAll();
	}
	
	// create employee 
		@PostMapping("/list")
		public EmployeeHistory createEmployeeHistory(@RequestBody EmployeeHistory employee) {
			return employeeRepository.save(employee);
		}
		
		// get employee by id 
		@GetMapping("/list/{id}")
		public ResponseEntity<EmployeeHistory> getEmployeeHistoryById(@PathVariable Long id) {
			EmployeeHistory employee = employeeRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
			return ResponseEntity.ok(employee);
		}
		
		// update employee rest api
		
		@PutMapping("/list/{id}")
		public ResponseEntity<EmployeeHistory> updateEmployeeHistory(@PathVariable Long id, @RequestBody EmployeeHistory employeeDetails){
			EmployeeHistory employee = employeeRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
			
			employee.setEmployeeId(employeeDetails.getEmployeeId());
			employee.setEmployeeFirstName(employeeDetails.getEmployeeFirstName());
			employee.setEmployeeLastName(employeeDetails.getEmployeeLastName());
			employee.setEmployeePhoneNumber(employeeDetails.getEmployeePhoneNumber());
			employee.setEmployeeEmail(employeeDetails.getEmployeeEmail());
			employee.setEmployeeAccountNumber(employeeDetails.getEmployeeAccountNumber());
			employee.setEmployeeBasicSalary(employeeDetails.getEmployeeBasicSalary());
			employee.setEmployeePosition(employeeDetails.getEmployeePosition());
			employee.setEmployeeLevel(employeeDetails.getEmployeeLevel());
			employee.setEmployeePositionSalary(employeeDetails.getEmployeePositionSalary());
			employee.setTime(employeeDetails.getTime());
			
			
			EmployeeHistory updatedEmployee = employeeRepository.save(employee);
			return ResponseEntity.ok(updatedEmployee);
		}
		
		//delete employee
		@DeleteMapping("/list/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteEmployeeHistory(@PathVariable Long id){
			EmployeeHistory employee = employeeRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
			employeeRepository.delete(employee);
			Map<String, Boolean> responce = new HashMap<>();
			responce.put("Deleted", Boolean.TRUE);
			return ResponseEntity.ok(responce);
			
		}
}
