package com.payroll.payrollbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "positon")
public class Position {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long positionId;
	
	@Column
	private String positionName;
	
	@Column
	private double positionSalary;
	
	public Position() {
		
	}

	public long getPositionId() {
		return positionId;
	}

	public void setPositionId(long positionId) {
		this.positionId = positionId;
	}

	public String getPositionName() {
		return positionName;
	}

	public void setPositionName(String positionName) {
		this.positionName = positionName;
	}

	public double getPositionSalary() {
		return positionSalary;
	}

	public void setPositionSalary(double positionSalary) {
		this.positionSalary = positionSalary;
	}

	public Position(String positionName, double positionSalary) {
		super();
		this.positionName = positionName;
		this.positionSalary = positionSalary;
	}
	

}
