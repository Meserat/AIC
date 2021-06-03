package com.payroll.payrollbackend.repository;

import java.util.List;

import com.payroll.payrollbackend.model.EmployeeDeduction;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeDeductionRepository  extends JpaRepository<EmployeeDeduction, Long>{

	List<EmployeeDeduction> findAll();  
	
}
