package com.payroll.payrollbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payroll.payrollbackend.model.Salary;

public interface SalaryRepository  extends JpaRepository<Salary, Long>{

	List<Salary> findAll(); 
 

}
