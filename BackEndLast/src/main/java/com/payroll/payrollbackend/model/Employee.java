package com.payroll.payrollbackend.model;

import java.io.Serializable;
import java.sql.Date;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.ColumnDefault;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name="employees")
public class Employee implements Serializable  {

	private static final long serialVersionUID = 1L;
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long employeeId;
	@Column
	private String employeeFirstName;
	@Column
	private String employeeLastName;
	@Column
	private String employeePhoneNumber;
	
    
	@Column (columnDefinition="varchar(255) default  'No email' ")
	private String employeeEmail;
	@Column
	private String employeeAccountNumber;
		@Column 
	private String employeeType;
	
	@ManyToOne 
	@JoinColumn(name = "salaryId")
	private Salary employeeSalary;
	
	@ManyToOne 
	@JoinColumn(name = "positionId")
	private Position position;
	
	@ManyToOne
	@JoinColumn(name="directorateId")
	private Directorate employeeDirectorate;
	@Column 
	private Date date;
	
	

	@JsonBackReference
	@OneToMany(mappedBy = "employee", cascade=CascadeType.ALL)
	private List<EmployeeAllowance> allowances;
	
	@JsonIgnore
	@OneToMany(mappedBy = "employee", cascade=CascadeType.ALL)
	private List<EmployeeDeduction> deductions;
	  
	  @Column
	  private Boolean status;
	  

		public Employee() {
		    	
		    }
		

	  
	  public Directorate getEmployeeDirectorate() {
			return employeeDirectorate;
		}


		public void setEmployeeDirectorate(Directorate employeeDirectorate) {
			this.employeeDirectorate = employeeDirectorate;
		}


	public Position getPosition() {
		return position;
	}

	 

		public String getEmployeeType() {
			return employeeType;
		}


		public void setEmployeeType(String employeeType) {
			this.employeeType = employeeType;
		}


	public void setPosition(Position position) {
		this.position = position;
	}


	public Boolean getStatus() {
		return status;
	}


	public void setStatus(Boolean status) {
		this.status = status;
	}

	public long getEmployeeId() {
		return employeeId;
	}


	public void setEmployeeId(long employeeId) {
		this.employeeId = employeeId;
	}


	public String getEmployeeFirstName() {
		return employeeFirstName;
	}


	public void setEmployeeFirstName(String employeeFirstName) {
		this.employeeFirstName = employeeFirstName;
	}


	public String getEmployeeLastName() {
		return employeeLastName;
	}


	public void setEmployeeLastName(String employeeLastName) {
		this.employeeLastName = employeeLastName;

	}


	public Date getDate() {
		return date;
	}



	public void setDate(Date date) {
		this.date = date;
	}



	public String getEmployeePhoneNumber() {
		return employeePhoneNumber;
	}

	public void setEmployeePhoneNumber(String employeePhoneNumber) {
		this.employeePhoneNumber = employeePhoneNumber;
	}

	public String getEmployeeEmail() {
		return employeeEmail;
	}

	public void setEmployeeEmail(String employeeEmail) {
		this.employeeEmail = employeeEmail;
	}

	public String getEmployeeAccountNumber() {
		return employeeAccountNumber;
	}

	public void setEmployeeAccountNumber(String employeeAccountNumber) {
		this.employeeAccountNumber = employeeAccountNumber;
	}

	
	public Employee(String employeeFirstName, String employeeLastName, String employeePhoneNumber, String employeeEmail,String employeeSection,String employeeLevel,
			String employeeType,
			String employeeAccountNumber, Salary employeeSalary, Position position, List<EmployeeAllowance> allowances,
			List<EmployeeDeduction> deductions, Directorate employeeDirectorate, Boolean status, Date date) {
		super();
		this.employeeFirstName = employeeFirstName;
		this.employeeLastName = employeeLastName;
		this.employeePhoneNumber = employeePhoneNumber;
		this.employeeEmail = employeeEmail;
		this.employeeAccountNumber = employeeAccountNumber;
		this.employeeSalary = employeeSalary;
		this.position = position;
		this.allowances = allowances;
		this.deductions = deductions;
		this.employeeType=employeeType;
		this.status = status;
		this.employeeDirectorate = employeeDirectorate;
		this.date=date;
	}


	public Salary getEmployeeSalary() {
		return employeeSalary;
	}


	public void setEmployeeSalary(Salary employeeSalary) {
		this.employeeSalary = employeeSalary;
	}


	public List<EmployeeAllowance> getAllowances() {
		return allowances;
	}


	public void setAllowances(List<EmployeeAllowance> allowances) {
		this.allowances = allowances;
	}


	public List<EmployeeDeduction> getDeductions() {
		return deductions;
	}


	public void setDeductions(List<EmployeeDeduction> deductions) {
		this.deductions = deductions;
	}


	@Override
	public String toString() {
		return "Employee [employeeId=" + employeeId + ", employeeFirstName=" + employeeFirstName + ", employeeLastName="
				+ employeeLastName + ", employeePhoneNumber=" + employeePhoneNumber + ", employeeEmail=" + employeeEmail
				+ ", employeeAccountNumber=" + employeeAccountNumber + ", employeeSalary=" + employeeSalary
				+ ", allowances=" + allowances + ", deductions=" + deductions + "]";
	}

	
}
