package com.payroll.payrollbackend.repository;

import java.util.List;

import com.payroll.payrollbackend.model.EmployeeAllowance;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeAllowanceRepository  extends JpaRepository<EmployeeAllowance, Long>{

	List<EmployeeAllowance> findAll();  

}
