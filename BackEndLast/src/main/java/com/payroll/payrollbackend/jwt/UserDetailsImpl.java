package com.payroll.payrollbackend.jwt;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.Objects;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.payroll.payrollbackend.model.User;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

public class UserDetailsImpl implements UserDetails{

    private static final long serialVersionUID = 1L;
    private Long id;
    private String username;
    
    private String email;
    private Boolean status;

    @JsonIgnore
    private String password;

    private Collection<? extends GrantedAuthority> authorities;
    
    public UserDetailsImpl(Long id, String userUserName, String userEmail, String userPassword,
            Boolean status,Collection<? extends GrantedAuthority> authorities) {
        this.id = id;
        this.username = userUserName;
        this.email = userEmail;
        this.status = status;
        this.password = userPassword;
        this.authorities = authorities;
    }
public static UserDetailsImpl build(User user){
    List<GrantedAuthority> authorities = new ArrayList<>();
    authorities.add(new SimpleGrantedAuthority(user.getUserRole().getRoleName()));
    return new UserDetailsImpl(user.getUserId(), user.getUserUserName(), user.getUserEmail(), user.getUserPassword(),user.getStatus(),authorities);
}
@Override
public Collection<? extends GrantedAuthority> getAuthorities() {
    return authorities;
}
@Override
public String getPassword() {
    return password;
}
@Override
public String getUsername() {
    return username;
}

public String getEmail(){
    return email;
}
public Long getId(){
    return id;
}
public Boolean getStatus() {
	return status;
}
public void setStatus(Boolean status) {
	this.status = status;
}
@Override
public boolean isAccountNonExpired() {
    return true;
}
@Override
public boolean isAccountNonLocked() {
    return true;
}
@Override
public boolean isCredentialsNonExpired() {
    return true;
}
@Override
public boolean isEnabled() {
   return true;
}
@Override
public boolean equals(Object o){
    if(this ==o)
        return true;
    if(o==null|| getClass() !=o.getClass())
        return false;
    UserDetailsImpl user = (UserDetailsImpl) o;
    return Objects.equals(id,user.id);
}

}