import { Role } from './../role';
import { TokenStorageService } from './../token-storage.service';
import { Allowance } from './../allowance';
import { Component, OnInit } from '@angular/core';
import { AllowanceService } from '../allowance.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-allowance',
  templateUrl: './create-allowance.component.html',
  styleUrls: ['./create-allowance.component.css']
})
export class CreateAllowanceComponent implements OnInit {
 allowance:Allowance=new Allowance();
   constructor(private allowanceService: AllowanceService,
    private tokenStorage:TokenStorageService,
    private router: Router) { }
  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("ACCOUNTANT")){
      this.router.navigate(['/']);
    }
  }

  saveAllowance(){
    this.allowanceService.createAllowance(this.allowance).subscribe( data =>{
      console.log(data);
      this.goToAllowanceList();
    },
    error => console.log(error));
  }

  goToAllowanceList(){
    this.router.navigate(['/allow']);
  }

  onSubmit(){
    console.log(this.allowance);
    this.saveAllowance();
  }

}
