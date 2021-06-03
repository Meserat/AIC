	
package com.payroll.payrollbackend.repository;
import java.util.List;
import com.payroll.payrollbackend.model.PayrollHistory;

import org.springframework.data.jpa.repository.JpaRepository;

public interface PayrollHistoryRepository extends JpaRepository<PayrollHistory, Long>{

		List<PayrollHistory> findAll();  

}