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
@Table(name = "salary")
public class Salary {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long salaryId;
	
	@ManyToOne 
	@JoinColumn(name = "IcfGradeId")
	private ICFGrade icfGrade;
	
	@ManyToOne
	@JoinColumn(name = "levelId")
	private Level level;
	
	@Column
	private double salaryAmount;
	
	public Salary() {
	}
	
	public long getSalaryId() {
		return salaryId; 
	}

	public void setSalaryId(long salaryId) {
		this.salaryId = salaryId;
	}

	public ICFGrade getIcfGrade() {
		return icfGrade;
	}

	public void setIcfGrade(ICFGrade icfGrade) {
		this.icfGrade = icfGrade;
	}

	public Level getLevel() {
		return level;
	}

	public void setLevel(Level level) {
		this.level = level;
	}

	public double getSalaryAmount() {
		return salaryAmount;
	}

	public void setSalaryAmount(double salaryAmount) {
		this.salaryAmount = salaryAmount;
	}

	public Salary(ICFGrade icfGrade, Level level, double salaryAmount) {
		super();
		this.icfGrade = icfGrade;
		this.level = level;
		this.salaryAmount = salaryAmount;
	}
	
	
}