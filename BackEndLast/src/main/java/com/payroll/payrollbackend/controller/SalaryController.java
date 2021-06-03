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
import com.payroll.payrollbackend.model.Salary;
import com.payroll.payrollbackend.repository.SalaryRepository;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/salary")
public class SalaryController {
	
		@Autowired
		private SalaryRepository salaryRepository;
		
		// get all employees
		@GetMapping("/list")
		public List<Salary> getAllEmployee(){
			return salaryRepository.findAll();
		}
		
		// create salary 
		@PostMapping("/list")
		public Salary createSalary(@RequestBody Salary salary) {
			return salaryRepository.save(salary);
		}
	
		
		// get user by id 
		@GetMapping("/list/{id}")
		public ResponseEntity<Salary> getSalaryById(@PathVariable Long id) {
			Salary salary = salaryRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("thia salary group  not exist with id :" + id));
			return ResponseEntity.ok(salary);
		}
		
		//update user 
		@PutMapping("/list/{id}")
		public ResponseEntity<Salary> updateSalary(@PathVariable Long id, @RequestBody Salary salaryD){
			Salary salary = salaryRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("this salary group not exist with id :" + id));
			
			salary.setSalaryId(salaryD.getSalaryId());
			salary.setIcfGrade(salaryD.getIcfGrade());
			salary.setLevel(salaryD.getLevel());
			salary.setSalaryAmount(salaryD.getSalaryAmount());
			
			
			Salary updatedSalary =salaryRepository.save(salary);
			return ResponseEntity.ok(updatedSalary);
		}
		
		//delete user
		@DeleteMapping("/list/{id}")
		public ResponseEntity<Map<String, Boolean>> deleteSalary(@PathVariable Long id){
			Salary salary = salaryRepository.findById(id)
					.orElseThrow(() -> new ResourceNotFoundException("salary group not  exist with id :" + id));
		   salaryRepository.delete(salary);
			Map<String, Boolean> responce = new HashMap<>();
			responce.put("Deleted", Boolean.TRUE);
			return ResponseEntity.ok(responce);
			
		}

		
}
