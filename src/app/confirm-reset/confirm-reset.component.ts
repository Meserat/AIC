import { ConfirmationToken } from './../confirmation-token';
import { Component, OnInit } from '@angular/core';
import { ForgotPasswordService } from '../forgot-password.service';
import { Route } from '@angular/compiler/src/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-confirm-reset',
  templateUrl: './confirm-reset.component.html',
  styleUrls: ['./confirm-reset.component.css']
})
export class ConfirmResetComponent implements OnInit {


    confirmationToken:ConfirmationToken = new ConfirmationToken();
    confirmedPassword:String;
  confirmed: boolean=false;
  message: string;
  correctCode: boolean = false;
  codeMessage: string;
  constructor(private forgetPasswordService:ForgotPasswordService,
    private route:Router) { }

  confirmPassowrd(){
    if(!(this.confirmationToken.userPassword == this.confirmedPassword)){
      this.confirmed=true;
      this.message = "password not match";
      this.route.navigate(['/confirm-reset']);
      }
      else{
        this.confirmed = false;
      }
        }
  ngOnInit(): void {

  }
  sendToken(){

    this.forgetPasswordService.confrimToken(this.confirmationToken).subscribe(data=>{
     this.correctCode = true;
    }),this.codeMessage="Incorrect Code", this.correctCode = false;
    this.confirmPassowrd();
   if(!this.confirmed && !this.correctCode ){
     this.route.navigate(['/login']);
   }
   else{
     this.route.navigate(['/confirm-reset'])
   }
  }
}
