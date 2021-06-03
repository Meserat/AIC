package com.payroll.payrollbackend.model;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="deductions")
public class Deduction {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long deductionId;
	
	@Column(name = "deductionName")
	private String deductionName;
	
	@Column(name="deductionType")
	private DeductionMethod deductionType;
	
	  @JsonIgnore
	@OneToMany(mappedBy = "deduction")
	private List<EmployeeDeduction> deductions;
	
	  
	public Deduction() {
		
	}


	public long getDeductionId() {
		return deductionId;
	}


	public void setDeductionId(long deductionId) {
		this.deductionId = deductionId;
	}


	public String getDeductionName() {
		return deductionName;
	}


	public void setDeductionName(String deductionName) {
		this.deductionName = deductionName;
	}


	public DeductionMethod getDeductionType() {
		return deductionType;
	}


	public void setDeductionType(DeductionMethod deductionType) {
		this.deductionType = deductionType;
	}


	public List<EmployeeDeduction> getDeductions() {
		return deductions;
	}


	public void setDeductions(List<EmployeeDeduction> deductions) {
		this.deductions = deductions;
	}


	public Deduction(String deductionName, DeductionMethod deductionType, List<EmployeeDeduction> deductions) {
		super();
		this.deductionName = deductionName;
		this.deductionType = deductionType;
		this.deductions = deductions;
	}


	
	

}
