package com.payroll.payrollbackend.repository;

import java.util.List;

import com.payroll.payrollbackend.model.Deduction;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DeductionRepository extends JpaRepository<Deduction, Long>{

	List<Deduction> findAll(); 
 

}
