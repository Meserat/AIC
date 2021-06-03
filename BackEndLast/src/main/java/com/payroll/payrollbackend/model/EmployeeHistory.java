package com.payroll.payrollbackend.model;

import java.io.Serializable;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;




@Entity
@Table(name="employeeHistory")
public class EmployeeHistory implements Serializable  {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long employeeId;
	@Column
	private String employeeFirstName;
	@Column
	private String employeeLastName;
	@Column
	private String employeePhoneNumber;
	@Column
	private String employeeEmail;
	@Column
	private String employeeAccountNumber;
	@Column
	private double employeeBasicSalary;
	@Column 
	private String employeePosition;
	@Column 
	private String employeeSection;
	@Column 
	private String employeeLevel;
	@Column 
	private double employeePositionSalary;
	
	@JsonFormat(pattern = "yyyy-MM-dd", shape=Shape.STRING)
	@Column(columnDefinition="text")
	private String time;
	
	public EmployeeHistory() {
		
	}

	public long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(long employeeId) {
		this.employeeId = employeeId;
	}

	public String getEmployeeFirstName() {
		return employeeFirstName;
	}

	public void setEmployeeFirstName(String employeeFirstName) {
		this.employeeFirstName = employeeFirstName;
	}

	public String getEmployeeLastName() {
		return employeeLastName;
	}

	public void setEmployeeLastName(String employeeLastName) {
		this.employeeLastName = employeeLastName;
	}

	public String getEmployeePhoneNumber() {
		return employeePhoneNumber;
	}

	public void setEmployeePhoneNumber(String employeePhoneNumber) {
		this.employeePhoneNumber = employeePhoneNumber;
	}

	public String getEmployeeEmail() {
		return employeeEmail;
	}

	public void setEmployeeEmail(String employeeEmail) {
		this.employeeEmail = employeeEmail;
	}

	public String getEmployeeAccountNumber() {
		return employeeAccountNumber;
	}

	public void setEmployeeAccountNumber(String employeeAccountNumber) {
		this.employeeAccountNumber = employeeAccountNumber;
	}

	public double getEmployeeBasicSalary() {
		return employeeBasicSalary;
	}

	public void setEmployeeBasicSalary(double employeeBasicSalary) {
		this.employeeBasicSalary = employeeBasicSalary;
	}

	public String getEmployeePosition() {
		return employeePosition;
	}

	public void setEmployeePosition(String employeePosition) {
		this.employeePosition = employeePosition;
	}

	public String getEmployeeLevel() {
		return employeeLevel;
	}

	public void setEmployeeLevel(String employeeLevel) {
		this.employeeLevel = employeeLevel;
	}

	public double getEmployeePositionSalary() {
		return employeePositionSalary;
	}

	public void setEmployeePositionSalary(double employeePositionSalary) {
		this.employeePositionSalary = employeePositionSalary;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public static long getSerialversionuid() {
		return serialVersionUID;
	}

	public String getEmployeeSection() {
		return employeeSection;
	}

	public void setEmployeeSection(String employeeSection) {
		this.employeeSection = employeeSection;
	}

	public EmployeeHistory(String employeeFirstName, String employeeLastName, String employeePhoneNumber,
			String employeeEmail, String employeeAccountNumber, double employeeBasicSalary, String employeePosition,
			String employeeSection, String employeeLevel, double employeePositionSalary, String time) {
		super();
		this.employeeFirstName = employeeFirstName;
		this.employeeLastName = employeeLastName;
		this.employeePhoneNumber = employeePhoneNumber;
		this.employeeEmail = employeeEmail;
		this.employeeAccountNumber = employeeAccountNumber;
		this.employeeBasicSalary = employeeBasicSalary;
		this.employeePosition = employeePosition;
		this.employeeSection = employeeSection;
		this.employeeLevel = employeeLevel;
		this.employeePositionSalary = employeePositionSalary;
		this.time = time;
	}

	
	

}
