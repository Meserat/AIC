import { ForgetPassword } from './../forget-password';
import { ForgotPasswordService } from './../forgot-password.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {


    forgetPassword:ForgetPassword = new ForgetPassword();

  constructor(private forgetPasswordService:ForgotPasswordService,
    private route:Router) { }

  ngOnInit(): void {

  }
  sendToEmail(){
    console.log(this.forgetPassword);
    this.forgetPasswordService.sendEmail(this.forgetPassword).subscribe(data=>{
      console.log(data)
    });
    this.route.navigate(['confirm-reset']).then(()=>{
              window.location.reload();
  });

}
}
