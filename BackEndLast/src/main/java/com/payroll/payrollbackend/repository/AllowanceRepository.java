package com.payroll.payrollbackend.repository;

import java.util.List;

import com.payroll.payrollbackend.model.Allowance;

import org.springframework.data.jpa.repository.JpaRepository;

public interface AllowanceRepository extends JpaRepository<Allowance, Long>{

	List<Allowance> findAll();  

}
