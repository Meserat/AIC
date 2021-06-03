package com.payroll.payrollbackend.model;

import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name="backpayment")
public class BackPayment {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long backPaymentId;
	
	@Column(name = "previousAmount")
	private double previousAmount;
	
	@Column(name = "newAmount")
	private double newAmount;
	
	@Column(name="date")
	private Date date;
	
	@OneToOne
	@JoinColumn(name="employeeId")
	private Employee employee;

	
	public BackPayment() {

	}

	public BackPayment(long backPaymentId, double previousAmount, double newAmount, Date date,Employee employee) {
		this.previousAmount = previousAmount;
		this.newAmount = newAmount;
		this.employee = employee;
		this.date=date;
	}

	public long getBackPaymentId() {
		return backPaymentId;
	}

	public void setBackPaymentId(long backPaymentId) {
		this.backPaymentId = backPaymentId;
	}

	public double getPreviousAmount() {
		return previousAmount;
	}

	public void setPreviousAmount(double previousAmount) {
		this.previousAmount = previousAmount;
	}

	public double getNewAmount() {
		return newAmount;
	}

	public void setNewAmount(double newAmount) {
		this.newAmount = newAmount;
	}

	public Employee getEmployee() {
		return employee;
	}

	public void setEmployee(Employee employee) {
		this.employee = employee;
	}

	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
	}
	
	
}
