package com.payroll.payrollbackend.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
//@EnableGlobalMethodSecurity(
//    securedEnabled = true,
//    // jsr250Enabled = true,
//     prePostEnabled = true
//    )
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{

    @Autowired
    UserDetailsServiceImpl userDetailsServiceImpl;
    @Autowired
    private AuthEntryPointJwt unauthorizedHandler;

    @Bean
    public AuthTokenFilter authenticationJwTokenFilter(){
        return new AuthTokenFilter();
    }
    @Override
    public void configure(AuthenticationManagerBuilder authenticationManagerBuilder) throws Exception{
        authenticationManagerBuilder.userDetailsService(userDetailsServiceImpl).passwordEncoder(passwordEncoder());    
    }
   @Bean
   @Override
   public AuthenticationManager authenticationManagerBean() throws Exception{
       return super.authenticationManagerBean();
   }
   @Bean
   public PasswordEncoder passwordEncoder(){
       return new BCryptPasswordEncoder();
   }
    
   @Override
   protected void configure(HttpSecurity http) throws Exception{
       http.cors().and().csrf().disable()
       .exceptionHandling().authenticationEntryPoint(unauthorizedHandler).and().sessionManagement()
       .sessionCreationPolicy(SessionCreationPolicy.STATELESS).and().authorizeRequests()
       .antMatchers("/allowance").hasRole("ACCOUNTANT")
       .antMatchers("/deduction").hasRole("ACCOUNTANT")
       .antMatchers("/employee-deduction").hasAnyRole("HR","ACCOUNTANT")
       .antMatchers("/employee-allowance").hasAnyRole("HR","ACCOUNTANT")
       .antMatchers("/income-tax").hasRole("ACCOUNTANT")
       .antMatchers("/employee").hasAnyRole("HR","ACCOUNTANT")
       .antMatchers("/user/forgot-password").permitAll()
       .antMatchers("/user/confirm-reset").permitAll()
       .antMatchers("/roles").hasRole("ADMIN")
       .antMatchers("/auth/signin").permitAll()  
       .antMatchers("/salary").permitAll()
       .antMatchers("/level").permitAll()
       .antMatchers("/section").permitAll()
       .antMatchers("/ICFGrade").permitAll()
       .antMatchers("/allowanceHistory").permitAll()
        .anyRequest().authenticated();

       http.addFilterBefore(authenticationJwTokenFilter(), UsernamePasswordAuthenticationFilter.class);
   }
   
}
