package com.payroll.payrollbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payroll.payrollbackend.model.Section;

public interface SectionRepository  extends JpaRepository<Section, Long>{

	List<Section> findAll(); 

}