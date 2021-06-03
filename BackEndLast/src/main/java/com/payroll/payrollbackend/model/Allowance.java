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
@Table(name="allowances")
public class Allowance {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long allowanceId;
	
	@Column
	private String allowanceName;
	
	 @JsonIgnore
	@OneToMany(mappedBy = "allowance")
	private List<EmployeeAllowance> allowances;

	
	public Allowance() {
	}


	public long getAllowanceId() {
		return allowanceId;
	}


	public void setAllowanceId(long allowanceId) {
		this.allowanceId = allowanceId;
	}


	public String getAllowanceName() {
		return allowanceName;
	}


	public void setAllowanceName(String allowanceName) {
		this.allowanceName = allowanceName;
	}


	public List<EmployeeAllowance> getAllowances() {
		return allowances;
	}


	public void setAllowances(List<EmployeeAllowance> allowances) {
		this.allowances = allowances;
	}


	public Allowance(String allowanceName, List<EmployeeAllowance> allowances) {
		super();
		this.allowanceName = allowanceName;
		this.allowances = allowances;
	}



	
	
}
