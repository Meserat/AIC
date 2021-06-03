package com.payroll.payrollbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonFormat.Shape;

@Entity
@Table(name="payrollHistory")
public class PayrollHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long payrollId;
	
	@Column
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
	private String employeeLevel;
	@Column
	private String employeeSection;
	@Column 
	private String employeePositionSalary;
	@Column
	private double totalSalary;
	@Column
	private double pension;
	
	@JsonFormat(pattern = "yyyy-MM-dd", shape=Shape.STRING)
	@Column(columnDefinition="text")
	private String time;
	
	@Column
	private double totalAllowances;
	
	@Column
	private double grossSalary;
	
	@Column
	private double incomeTax;
	
	@Column
	private double totalDeductions;
	
	@Column
	private double netSalary;
	
	public PayrollHistory() {
		
	}

	public long getPayrollId() {
		return payrollId;
	}

	public void setPayrollId(long payrollId) {
		this.payrollId = payrollId;
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

	public String getEmployeeSection() {
		return employeeSection;
	}

	public void setEmployeeSection(String employeeSection) {
		this.employeeSection = employeeSection;
	}

	public String getEmployeePositionSalary() {
		return employeePositionSalary;
	}

	public void setEmployeePositionSalary(String employeePositionSalary) {
		this.employeePositionSalary = employeePositionSalary;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public double getTotalAllowances() {
		return totalAllowances;
	}

	public void setTotalAllowances(double totalAllowances) {
		this.totalAllowances = totalAllowances;
	}

	public double getGrossSalary() {
		return grossSalary;
	}

	public void setGrossSalary(double grossSalary) {
		this.grossSalary = grossSalary;
	}

	public double getIncomeTax() {
		return incomeTax;
	}

	public void setIncomeTax(double incomeTax) {
		this.incomeTax = incomeTax;
	}

	public double getTotalDeductions() {
		return totalDeductions;
	}

	public void setTotalDeductions(double totalDeductions) {
		this.totalDeductions = totalDeductions;
	}

	public double getNetSalary() {
		return netSalary;
	}

	public void setNetSalary(double netSalary) {
		this.netSalary = netSalary;
	}

	
	public double getTotalSalary() {
		return totalSalary;
	}

	public void setTotalSalary(double totalSalary) {
		this.totalSalary = totalSalary;
	}

	public double getPension() {
		return pension;
	}

	public void setPension(double pension) {
		this.pension = pension;
	}

	public PayrollHistory(long employeeId, String employeeFirstName, String employeeLastName,
			String employeePhoneNumber, String employeeEmail, String employeeAccountNumber, double employeeBasicSalary,
			String employeePosition, String employeeLevel, String employeeSection, String employeePositionSalary,
			double totalSalary, double pension, String time, double totalAllowances, double grossSalary,
			double incomeTax, double totalDeductions, double netSalary) {
		super();
		this.employeeId = employeeId;
		this.employeeFirstName = employeeFirstName;
		this.employeeLastName = employeeLastName;
		this.employeePhoneNumber = employeePhoneNumber;
		this.employeeEmail = employeeEmail;
		this.employeeAccountNumber = employeeAccountNumber;
		this.employeeBasicSalary = employeeBasicSalary;
		this.employeePosition = employeePosition;
		this.employeeLevel = employeeLevel;
		this.employeeSection = employeeSection;
		this.employeePositionSalary = employeePositionSalary;
		this.totalSalary = totalSalary;
		this.pension = pension;
		this.time = time;
		this.totalAllowances = totalAllowances;
		this.grossSalary = grossSalary;
		this.incomeTax = incomeTax;
		this.totalDeductions = totalDeductions;
		this.netSalary = netSalary;
	}

}
