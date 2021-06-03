package com.payroll.payrollbackend.repository;

import org.springframework.data.repository.CrudRepository;

import com.payroll.payrollbackend.model.ConfirmationToken;

public interface ConfirmationTokenRepository extends CrudRepository<ConfirmationToken, String> {
	ConfirmationToken findByConfirmationToken(String confirmationToken);
}
