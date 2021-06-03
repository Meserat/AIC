package com.payroll.payrollbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.payroll.payrollbackend.model.Level;

public interface LevelRepository extends JpaRepository<Level, Long>{

	List<Level> findAll(); 

}
