package com.payroll.payrollbackend.payload;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Size;

import com.payroll.payrollbackend.model.Role;

public class SignupRequest {

    @NotBlank
    @Size(min = 3, max = 20)
    private String userFirstName;
    
    @NotBlank
    @Size(min = 3, max = 20)
    private String userLastName;
   
    @NotBlank
    @Size(min = 3, max = 20)
    private String userUserName;
    
    @NotBlank
    @Size(min = 3, max = 20)
    private String userPhoneNumber;
   
    @NotBlank
    @Size(max = 50)
    @Email
    private String userEmail;

    private Role userRole;

    @NotBlank
    @Size(min = 6, max = 40)
    private String userPassword;

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

    public String getUserPhoneNumber() {
        return userPhoneNumber;
    }

    public void setUserPhoneNumber(String userPhoneNumber) {
        this.userPhoneNumber = userPhoneNumber;
    }

    public String getUserEmail() {
        return userEmail;
    }

    public void setUserEmail(String userEmail) {
        this.userEmail = userEmail;
    }

    public Role getUserRole() {
        return userRole;
    }

    public void setUserRole(Role userRole) {
        this.userRole = userRole;
    }

    public String getUserPassword() {
        return userPassword;
    }

    public void setUserPassword(String password) {
        this.userPassword = password;
    }

}
