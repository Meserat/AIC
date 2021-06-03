package com.payroll.payrollbackend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.payroll.payrollbackend.model.Role;
import com.payroll.payrollbackend.repository.RoleRepository;

@CrossOrigin(origins="*")
@RestController
//@Secured({"ADMIN"})
@RequestMapping("/roles")
public class RoleController {
	
		@Autowired
		private RoleRepository roleRepository;
		
		// get all Roles
		@GetMapping("/list")
		public List<Role> getAllRoles(){
			return roleRepository.findAll();
		}
    }