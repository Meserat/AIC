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
import com.payroll.payrollbackend.model.Employee;
import com.payroll.payrollbackend.repository.EmployeeRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/employee")
public class EmployeeController {
	
	@Autowired
	private EmployeeRepository employeeRepository;

	
	// get all employees
	@GetMapping("/employees")
	public List<Employee> getAllEmployee(){
		return employeeRepository.findAll();
	}
	
	// create employee 
		@PostMapping("/employees")
		public Employee createEmployee(@RequestBody Employee employee) {
			return employeeRepository.save(employee);
		}
		
		// get employee by id 
		@GetMapping("/employees/{id}")
		public ResponseEntity<Employee> getEmployeeById(@PathVariable Long id) {
			Employee employee = employeeRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
			return ResponseEntity.ok(employee);
		}
		
		// update employee rest api
		
		@PutMapping("/employees/{id}")
		public ResponseEntity<Employee> updateEmployee(@PathVariable Long id, @RequestBody Employee employeeDetails){
			Employee employee = employeeRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
			
			employee.setEmployeeId(employeeDetails.getEmployeeId());
			employee.setEmployeeFirstName(employeeDetails.getEmployeeFirstName());
			employee.setEmployeeLastName(employeeDetails.getEmployeeLastName());
			employee.setEmployeePhoneNumber(employeeDetails.getEmployeePhoneNumber());
			employee.setEmployeeEmail(employeeDetails.getEmployeeEmail());
			employee.setEmployeeAccountNumber(employeeDetails.getEmployeeAccountNumber());
			employee.setEmployeeSalary(employeeDetails.getEmployeeSalary());
			employee.setPosition(employeeDetails.getPosition());
			employee.setStatus(employeeDetails.getStatus());
			employee.setEmployeeType(employeeDetails.getEmployeeType());
			employee.setEmployeeDirectorate(employeeDetails.getEmployeeDirectorate());
			
	    	Employee updatedEmployee = employeeRepository.save(employee);
			return ResponseEntity.ok(updatedEmployee);
		}
		
		//delete employee
		@DeleteMapping("/employees/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteEmployee(@PathVariable Long id){
			Employee employee = employeeRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("Employee not exist with id :" + id));
			employeeRepository.delete(employee);
			Map<String, Boolean> responce = new HashMap<>();
			responce.put("Deleted", Boolean.TRUE);
			return ResponseEntity.ok(responce);
			
		}
}
