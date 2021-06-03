import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-appheader',
  templateUrl: './appheader.component.html',
  styleUrls: ['./appheader.component.css']
})
export class AppheaderComponent implements OnInit {
  role:String;
  user:String;
  constructor( private tokenStorage:TokenStorageService, private router:Router) { }
  ngOnInit(): void {
    this.role = this.tokenStorage.getUser().roles[0];
    this.user = this.tokenStorage.getUser().username;
    console.log(this.role);
    console.log(this.user);
  }
isAccountant(){
    return ("ACCOUNTANT"===this.role);
  }
clearMySession() {
   this.tokenStorage.clearSession();
     this.router.navigate(['/']).then(()=>{
        window.location.reload();
      });

}


}


