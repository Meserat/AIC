import { TokenStorageService } from './../token-storage.service';
import { Deduction } from './../deduction';
import { Component, OnInit } from '@angular/core';

import { DeductionService } from '../deduction.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-create-deduction',
  templateUrl: './create-deduction.component.html',
  styleUrls: ['./create-deduction.component.css']
})
export class CreateDeductionComponent implements OnInit {

  deduction:Deduction=new Deduction();
  constructor(private deductionService: DeductionService,
    private tokenStorage:TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("ACCOUNTANT")){
      this.router.navigate(['/']);
    }
  }

  saveDeduction(){
    this.deductionService.createDeduction(this.deduction).subscribe( data =>{
      console.log(data);
      this.goToDeductionList();
    },
    error => console.log(error));
  }

  goToDeductionList(){
    this.router.navigate(['/dedu']);
  }

  onSubmit(){
    console.log(this.deduction);
    this.saveDeduction();
  }

}
