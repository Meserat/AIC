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
@Table(name="users")
public class User {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	 private long userId;
	
	@Column
	 private String userFirstName;
	@Column
	 private Boolean status;
	
	@Column
	 private String userLastName;
	
	@Column
	 private String userUserName;
	 
	@Column
	 private String userEmail;
	 
	@Column
	 private String userPhoneNumber;
	 
	@Column
	 private String userPassword;
	
    @ManyToOne 
	@JoinColumn(name = "roleName")
	private Role userRole;
    

	public User(){}
	public User(String userFirstName, String userLastName, String userUserName, String userEmail,
			String userPhoneNumber, String userPassword, Role userRole,Boolean status) {

//		this.userId = userId;
		this.userFirstName = userFirstName;
		this.userLastName = userLastName;
		this.userUserName = userUserName;
		this.userEmail = userEmail;
		this.userPhoneNumber = userPhoneNumber;
		this.userPassword = userPassword;
		this.userRole = userRole;
		this.status=status;		

	}
	
	
	public Boolean getStatus() {
		return status;
	}
	public void setStatus(Boolean status) {
		this.status = status;
	}
	
	public long getUserId() {
		return userId;
	}
	public void setUserId(long userId) {
		this.userId = userId;
	}
	public String getUserFirstName() {
		return userFirstName;
	}
	public void setUserFirstName(String userFirstName) {
		this.userFirstName = userFirstName;
	}
	public String getUserLastName() {
		return userLastName;
	}
	public void setUserLastName(String userLastName) {
		this.userLastName = userLastName;
	}
	public String getUserUserName() {
		return userUserName;
	}
	public void setUserUserName(String userUserName) {
		this.userUserName = userUserName;
	}
	public String getUserEmail() {
		return userEmail;
	}
	public void setUserEmail(String userEmail) {
		this.userEmail = userEmail;
	}
	public String getUserPhoneNumber() {
		return userPhoneNumber;
	}
	public void setUserPhoneNumber(String userPhoneNumber) {
		this.userPhoneNumber = userPhoneNumber;
	}
	public String getUserPassword() {
		return userPassword;
	}
	public void setUserPassword(String userPassword) {
		this.userPassword = userPassword;
	}
	public Role getUserRole() {
		return userRole;
	}
	public void setUserRole(Role userRole) {
		this.userRole = userRole;
	}

}
