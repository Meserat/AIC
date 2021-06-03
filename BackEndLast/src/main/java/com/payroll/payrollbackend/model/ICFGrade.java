package com.payroll.payrollbackend.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "ICFGrade")
public class ICFGrade {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long ICFGradeId;
	
	@Column
	private String icfGradeName;
	
	@JsonIgnore
	@OneToMany(mappedBy = "salaryId", cascade=CascadeType.ALL)
	private List<Salary> salaries;
	
	

	public ICFGrade() {
		
	}
	

	public String getIcfGradeName() {
		return icfGradeName;
	}

	public void setIcfGradeName(String icfGradeName) {
		this.icfGradeName = icfGradeName;
	}

	public List<Salary> getSalaries() {
		return salaries; 
	}

	public void setSalaries(List<Salary> salaries) {
		this.salaries = salaries;
	}

	public long getICFGradeId() {
		return ICFGradeId;
	}

	public void setICFGradeId(long iCFGradeId) {
		ICFGradeId = iCFGradeId;
	}

	public String getICFGradeName() {
		return icfGradeName;
	}

	public void setICFGradeName(String iCFGradeName) {
		icfGradeName = iCFGradeName;
	}


	public ICFGrade(String icfGradeName, List<Salary> salaries) {
		super();
		this.icfGradeName = icfGradeName;
		this.salaries = salaries;
	}
	


	
}
