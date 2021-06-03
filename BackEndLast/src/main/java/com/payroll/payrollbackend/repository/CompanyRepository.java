package com.payroll.payrollbackend.repository;

import java.util.List;

import com.payroll.payrollbackend.model.Company;

import org.springframework.data.jpa.repository.JpaRepository;

public interface CompanyRepository extends JpaRepository<Company, Long>{

	List<Company> findAll(); 

}
