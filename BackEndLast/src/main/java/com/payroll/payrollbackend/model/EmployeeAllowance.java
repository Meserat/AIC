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
@Table(name= "employeeAllowance")
public class EmployeeAllowance {
		
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private long employeeAllowanceId;
		
		@ManyToOne
		@JoinColumn(name = "employeeId")
		private Employee employee;
		
		@ManyToOne
		@JoinColumn(name = "allowanceId")
		private Allowance allowance;
		
		@Column
		private double amount;
		
		public EmployeeAllowance() {
			
		}

		public long getEmployeeAllowanceId() {
			return employeeAllowanceId;
		}

		public void setEmployeeAllowanceId(long employeeAllowanceId) {
			this.employeeAllowanceId = employeeAllowanceId;
		}

		public Employee getEmployee() {
			return employee;
		}

		public void setEmployee(Employee employee) {
			this.employee = employee;
		}

		public Allowance getAllowance() {
			return allowance;
		}

		public void setAllowance(Allowance allowance) {
			this.allowance = allowance;
		}

		public double getAmount() {
			return amount;
		}

		public void setAmount(double amount) {
			this.amount = amount;
		}

		public EmployeeAllowance(Employee employee, Allowance allowance, double amount) {
			super();
			this.employee = employee;
			this.allowance = allowance;
			this.amount = amount;
		}

		
		
		
}
