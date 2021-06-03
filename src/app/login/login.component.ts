import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../auth.service';
import { Login } from '../login';

import { TokenStorageService } from '../token-storage.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  public loginForm: FormGroup;
  public isAuthLoading = false;
  loginInfo:Login=new Login();
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: String = null;
  isCorrect=false;
  isReloaded:Boolean = false;
  constructor(
    private authService: AuthService,
    private tokenStorage: TokenStorageService,
    private router:Router,
    private renderer: Renderer2,
    private toastr: ToastrService,
  ) {}
  ngOnDestroy() {
  //  this.renderer.removeClass(document.querySelector('app-root'),'login');
  }

  ngOnInit() {
    this.renderer.addClass(document.querySelector('app-root'), 'login-page');
    this.loginForm = new FormGroup({
      username: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required),
    });
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }

  }

  login() {
    if (this.loginForm.valid) {

      this.authService.login(this.loginInfo.username, this.loginInfo.password).subscribe(data => {
          this.tokenStorage.clearSession();
          this.tokenStorage.saveToken(data.accessToken);
          this.tokenStorage.saveUser(data);
          this.isLoginFailed = false;
          this.isLoggedIn = true;
          this.roles = this.tokenStorage.getUser().roles;

          console.log(data);
          console.log(this.roles[0]);

        if(data.status==true){
          this.router.navigate(["update-user",data.id]);

        }
        else{


           if(this.roles[0] == "ADMIN"){
            this.router.navigate(['admin']).then(()=>{
              window.location.reload();
             });
           }
          else if(this.roles[0] == "HR"){
            this.router.navigate(['hroffice']).then(()=>{
              window.location.reload();
            });
            // this.reloadPage();
          }
          else if(this.roles[0] == "ACCOUNTANT"){
            this.router.navigate(['month']).then(()=>{
              window.location.reload();
            });
            // this.refreshPage();
          }
          else{
          this.router.navigate(['/']).then(()=>{
              window.location.reload();
            });
          }
          }
      }, err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
        this.isCorrect=true;
      }
    );
    }
     else {
      this.toastr.error('Hello world!', 'Toastr fun!');
    }
  }
  onSubmit() :void{
    this.login();
  }
}
