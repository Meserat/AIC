package com.payroll.payrollbackend.repository;

import java.util.List;

import com.payroll.payrollbackend.model.IncomeTax;

import org.springframework.data.jpa.repository.JpaRepository;

public interface IncomeTaxRepository extends JpaRepository<IncomeTax, Long>{

	List<IncomeTax> findAll();  

}
