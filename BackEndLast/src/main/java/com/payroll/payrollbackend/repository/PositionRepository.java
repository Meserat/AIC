package com.payroll.payrollbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.payroll.payrollbackend.model.Position;

public interface PositionRepository extends JpaRepository<Position, Long>{

	List<Position> findAll();
	

}
