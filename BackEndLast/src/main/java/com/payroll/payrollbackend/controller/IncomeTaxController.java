package com.payroll.payrollbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.payroll.payrollbackend.exception.ResourceNotFoundException;
import com.payroll.payrollbackend.model.IncomeTax;
import com.payroll.payrollbackend.repository.IncomeTaxRepository;

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

@CrossOrigin(origins="*")
@RestController
//@Secured({"HR","ACCOUNTANT"})
@RequestMapping("/income-tax")
public class IncomeTaxController {
			@Autowired
			private IncomeTaxRepository incomeTaxRepository;
			
			// get all taxes
			@GetMapping("/list")
			public List<IncomeTax> getAllIncomeTax(){
				return incomeTaxRepository.findAll();
			}		
			
			// create income tax
			@PostMapping("/list")
			public IncomeTax createIncomeTax(@RequestBody IncomeTax salary) {
				return incomeTaxRepository.save(salary);
			}
			
			
			// get tax by id 
			@GetMapping("/list/{id}")
			public ResponseEntity<IncomeTax> getIncomeTaxById(@PathVariable Long id) {
				IncomeTax salary =incomeTaxRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("this Tax  not exist with id :" + id));
				return ResponseEntity.ok(salary);
			}
			
			//update tax
			@PutMapping("/list/{id}")
			public ResponseEntity<IncomeTax> updateIncomeTax(@PathVariable Long id, @RequestBody IncomeTax salaryD){
				IncomeTax salary = incomeTaxRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("this salary group not exist with id :" + id));
				
				salary.setIncomeTaxId(salaryD.getIncomeTaxId());
				salary.setIncomeTaxMax(salaryD.getIncomeTaxMax());
				salary.setIncomeTaxMin(salaryD.getIncomeTaxMin());
				salary.setIncomeTaxpercentage(salaryD.getIncomeTaxpercentage());
				salary.setIncomeTaxOffSet(salaryD.getIncomeTaxOffSet());
				
				IncomeTax updatedIncomeTax =incomeTaxRepository.save(salary);
				return ResponseEntity.ok(updatedIncomeTax);
			}
			
			//delete tax
			@DeleteMapping("/list/{id}")
			public ResponseEntity<Map<String, Boolean>> deleteIncomeTax(@PathVariable Long id){
				IncomeTax salary =incomeTaxRepository.findById(id)
						.orElseThrow(() -> new ResourceNotFoundException("Tax group not  exist with id :" + id));
				incomeTaxRepository.delete(salary);
				Map<String, Boolean> responce = new HashMap<>();
				responce.put("Deleted", Boolean.TRUE);
				return ResponseEntity.ok(responce);
				
			}

			
	}
