package com.payroll.payrollbackend.controller;

import java.util.List;

import com.payroll.payrollbackend.model.Company;
import com.payroll.payrollbackend.repository.CompanyRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins="*")
@RestController
@RequestMapping("/company")

public class CompanyController {

		@Autowired
		private CompanyRepository companyRepository;
		
		// get all Company
		@GetMapping("/list")
		public List<Company> getAllCompany(){
			return companyRepository.findAll();
		}		
		

}
