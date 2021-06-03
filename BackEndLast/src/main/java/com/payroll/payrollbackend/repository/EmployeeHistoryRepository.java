	
package com.payroll.payrollbackend.repository;
import java.util.List;
import com.payroll.payrollbackend.model.EmployeeHistory;

import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeHistoryRepository extends JpaRepository<EmployeeHistory, Long>{

		List<EmployeeHistory> findAll();  


}