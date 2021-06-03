package com.payroll.payrollbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="incomeTaxes")
public class IncomeTax {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long incomeTaxId;
	
	@Column
	private double incomeTaxMin;
	
	@Column
	private double incomeTaxMax;
	
	@Column
	private double incomeTaxpercentage;
	@Column 
	private double incomeTaxOffSet;
	
	public double getIncomeTaxOffSet() {
		return incomeTaxOffSet;
	}
	public void setIncomeTaxOffSet(double incomeTaxOffSet) {
		this.incomeTaxOffSet = incomeTaxOffSet;
	}
	public IncomeTax() {
		
	}
	public long getIncomeTaxId() {
		return incomeTaxId;
	}
	public void setIncomeTaxId(long incomeTaxId) {
		this.incomeTaxId = incomeTaxId;
	}
	public double getIncomeTaxMin() {
		return incomeTaxMin;
	}
	public void setIncomeTaxMin(double incomeTaxMin) {
		this.incomeTaxMin = incomeTaxMin;
	}
	public double getIncomeTaxMax() {
		return incomeTaxMax;
	}
	public void setIncomeTaxMax(double incomeTaxMax) {
		this.incomeTaxMax = incomeTaxMax;
	}
	public double getIncomeTaxpercentage() {
		return incomeTaxpercentage;
	}
	public void setIncomeTaxpercentage(double incomeTaxpercentage) {
		this.incomeTaxpercentage = incomeTaxpercentage;
	}
	

}
