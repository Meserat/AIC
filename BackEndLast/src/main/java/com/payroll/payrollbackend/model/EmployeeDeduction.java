package com.payroll.payrollbackend.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name= "employeeDeduction")
public class EmployeeDeduction {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long employeeDeductionId;
	
	@ManyToOne
	@JoinColumn(name = "employeeId")
	private Employee employee;
	
	@ManyToOne
	@JoinColumn(name = "deductionId")
	private Deduction deduction;
	
	@Column
	private double amount;
	
	public EmployeeDeduction() {
		
	}

	public long getEmployeeDeductionId() {
		return employeeDeductionId;
	}

	public void setEmployeeDeductionId(long employeeDeductionId) {
		this.employeeDeductionId = employeeDeductionId;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Deduction getDeduction() {
		return deduction;
	}

	public void setDeduction(Deduction deduction) {
		this.deduction = deduction;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public EmployeeDeduction(Employee employee, Deduction deduction, double amount) {
		super();
		this.employee = employee;
		this.deduction = deduction;
		this.amount = amount;
	}

	

}
