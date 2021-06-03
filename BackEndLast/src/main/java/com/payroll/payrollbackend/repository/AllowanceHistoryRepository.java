	
package com.payroll.payrollbackend.repository;
import java.util.List;

import com.payroll.payrollbackend.model.AllowanceHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AllowanceHistoryRepository extends JpaRepository<AllowanceHistory, Long>{

		List<AllowanceHistory> findAll();  


}