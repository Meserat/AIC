
	
package com.payroll.payrollbackend.repository;
import java.util.List;
import com.payroll.payrollbackend.model.DeductionHistory;

import org.springframework.data.jpa.repository.JpaRepository;

public interface DeductionHistoryRepository extends JpaRepository<DeductionHistory, Long>{

		List<DeductionHistory> findAll();  


}
