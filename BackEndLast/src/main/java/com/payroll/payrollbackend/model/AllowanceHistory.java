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
@Table(name="allowanceHistory")
public class AllowanceHistory {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long id;
	
	@Column
	private long employeeId;
	@Column
	private String allowanceName;
	@Column
	private double allowanceAmount;
	
	@JsonFormat(pattern = "yyyy-MM-dd", shape=Shape.STRING)
	@Column(columnDefinition="text")
	private String time;
	
	public AllowanceHistory() {
		
	}

	public long getId() {
		return id;
	}

	public void setId(long id) {
		this.id = id;
	}

	public long getEmployeeId() {
		return employeeId;
	}

	public void setEmployeeId(long employeeId) {
		this.employeeId = employeeId;
	}

	public String getAllowanceName() {
		return allowanceName;
	}

	public void setAllowanceName(String allowanceName) {
		this.allowanceName = allowanceName;
	}

	public double getAllowanceAmount() {
		return allowanceAmount;
	}

	public void setAllowanceAmount(double allowanceAmount) {
		this.allowanceAmount = allowanceAmount;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public AllowanceHistory(long employeeId, String allowanceName, double allowanceAmount, String time) {
		super();
		this.employeeId = employeeId;
		this.allowanceName = allowanceName;
		this.allowanceAmount = allowanceAmount;
		this.time = time;
	}
	
}
