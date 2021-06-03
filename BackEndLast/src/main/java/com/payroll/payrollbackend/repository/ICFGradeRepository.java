package com.payroll.payrollbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.payroll.payrollbackend.model.ICFGrade;

public interface ICFGradeRepository extends JpaRepository<ICFGrade, Long>{

	List<ICFGrade> findAll(); 

}
