package com.payroll.payrollbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payroll.payrollbackend.model.Directorate;


public interface DirectorateRepository extends JpaRepository<Directorate, Long>{

	List<Directorate> findAll(); 
}
 
