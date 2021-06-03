package com.payroll.payrollbackend.repository;

import java.util.List;
import java.util.Optional;

import com.payroll.payrollbackend.model.User;
import org.springframework.data.jpa.repository.JpaRepository;


public interface UserRepository extends JpaRepository<User, Long> {

	Optional<User> findByUserUserName(String userUserName);

	Boolean existsByUserUserName(String userUserName);
	Boolean existsByUserEmail(String userEmail);
	
    User findByUserEmail(String userEmail);
    
	List<User> findAll();
}
