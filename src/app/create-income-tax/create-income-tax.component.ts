import { TokenStorageService } from './../token-storage.service';
import { IncomeTaxService } from './../income-tax.service';
import { IncomeTax } from './../income-tax';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler/src/ml_parser/lexer';

@Component({
  selector: 'app-create-income-tax',
  templateUrl: './create-income-tax.component.html',
  styleUrls: ['./create-income-tax.component.css']
})
export class CreateIncomeTaxComponent implements OnInit {
 alert:boolean=false;
 incometax: IncomeTax = new IncomeTax();
  constructor(private incomeTaxService: IncomeTaxService,
    private tokenStorage:TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("ACCOUNTANT")){
      this.router.navigate(['/']);
    }
  }

  saveSalary(){
    this.incomeTaxService.createIncomeTax(this.incometax).subscribe( data =>{

       this.goToIncomeTaxList();

    },
    error => console.log(error));
  }

  goToIncomeTaxList(){
    this.router.navigate(['/income']);
  }

  onSubmit(){
    console.log(this.incometax);
      this.alert=true;
    this.saveSalary();
  }
  closeAlert(){
    this.alert=false;
  }
}
