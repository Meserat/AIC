package com.payroll.payrollbackend.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


   @Entity
	@Table(name = "company")
	public class Company {
		
		@Id
		@GeneratedValue(strategy = GenerationType.IDENTITY)
		private long companyId;
		@Column(name = "companyName")
		private String companyName;
		@Column(name = "companyLogo")
		private String companyLogo;

	    
	    public Company() {
	    	
	    }

		public long getCompanyId() {
			return companyId;
		}
		public void setCompanyId(long companyId) {
			this.companyId = companyId;
		}
		public String getCompanyName() {
			return companyName;
		}
		public void setCompanyName(String companyName) {
			this.companyName = companyName;
		}
		public String getCompanyLogo() {
			return companyLogo;
		}
		public void setCompanyLogo(String companyLogo) {
			this.companyLogo = companyLogo;
		}

		public Company(String companyName, String companyLogo) {
			super();
			this.companyName = companyName;
			this.companyLogo = companyLogo;
		}
		
	
	

}
