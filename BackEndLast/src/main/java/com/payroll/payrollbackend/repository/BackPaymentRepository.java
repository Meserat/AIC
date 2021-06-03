package com.payroll.payrollbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payroll.payrollbackend.model.BackPayment;


public interface BackPaymentRepository  extends JpaRepository<BackPayment, Long>{

	List<BackPayment> findAll();  
}
