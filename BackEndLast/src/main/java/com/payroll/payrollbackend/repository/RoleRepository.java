package com.payroll.payrollbackend.repository;

import java.util.List;
import java.util.Optional;

import com.payroll.payrollbackend.model.Role;

import org.springframework.data.jpa.repository.JpaRepository;


public interface RoleRepository extends JpaRepository<Role, Long> {
    Optional<Role> findByRoleName(String roleName);
    Optional<Role> findById(Long id);
    List<Role> findAll();
    
}
