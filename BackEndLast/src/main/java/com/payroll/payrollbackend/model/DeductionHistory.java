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
@Table(name="deductionHistory")
public class DeductionHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long deductionHistoryId;
	
	@Column
	private long employeeId;
	@Column
	private String deductionName;
	@Column
	private double deductionAmount;
	
	@JsonFormat(pattern = "yyyy-MM-dd", shape=Shape.STRING)
	@Column(columnDefinition="text")
	private String time;
	
	public DeductionHistory() {
		
	}

	public long getId() {
		return deductionHistoryId;
	}

	public void setId(long id) {
		this.deductionHistoryId = id;
	}

	public long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(long employeeId) {
		this.employeeId = employeeId;
	}

	public String getDeductionName() {
		return deductionName;
	}

	public void setDeductionName(String deductionName) {
		this.deductionName = deductionName;
	}

	public double getDeductionAmount() {
		return deductionAmount;
	}

	public void setDeductionAmount(double deductionAmount) {
		this.deductionAmount = deductionAmount;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public DeductionHistory(long employeeId, String deductionName, double deductionAmount, String time) {
		super();
		this.employeeId = employeeId;
		this.deductionName = deductionName;
		this.deductionAmount = deductionAmount;
		this.time = time;
	}
	
	
}
