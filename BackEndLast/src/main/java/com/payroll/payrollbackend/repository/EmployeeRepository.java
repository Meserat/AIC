package com.payroll.payrollbackend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.payroll.payrollbackend.model.Employee;

public interface EmployeeRepository extends JpaRepository<Employee, Long>{

	List<Employee> findAll();  

}
