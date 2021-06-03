import { TokenStorageService } from './../token-storage.service';
import { Deduction } from './../deduction';
import { EmployeeDeduction } from './../employee-deduction';
import { Component, Input, OnInit } from '@angular/core';
import { EmployeeDeductionService } from '../employee-deduction.service';
import { Router } from '@angular/router';
import { Employee } from '../employee';
import { Observable } from 'rxjs';
import { DeductionService } from '../deduction.service';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-create-employee-deduction',
  templateUrl: './create-employee-deduction.component.html',
  styleUrls: ['./create-employee-deduction.component.css']
})
export class CreateEmployeeDeductionComponent implements OnInit {

deductions:Observable <Deduction[]>
 employees:Observable <Employee[]>
 existingDeduction: EmployeeDeduction[];

  allowanceId:number;

  selectedValue:number;
  @Input() allowance:Deduction;
   @Input() employee:Employee;

  constructor(private employeeDeductionService: EmployeeDeductionService,
    private deductionService:DeductionService, private tokenStorage:TokenStorageService,
    private employeeService:EmployeeService,
    private router: Router) { }

    reloadData(){
  this.deductions=this.deductionService.getDeductionsList();
   this.employees=this.employeeService.getEmployeeList1();
}

private getEmployeeDeductionByEmployeeId(employeeId:number){
  return this.existingDeduction.filter(item=>item.employee.employeeId==employeeId);
}
  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("ACCOUNTANT")){
      this.router.navigate(['/']);
    }
    else{
      this.employeeDeductionService.getEmployeeDeductionList().subscribe(data=>{
      this.existingDeduction = data;
    });
    }
  }


 employeeDeduction: EmployeeDeduction = new EmployeeDeduction();

  saveEmployeeDeduction(){
    this.employeeDeductionService.createEmployeeDeduction(this.employeeDeduction).subscribe( data =>{
      console.log(data);
      this.goToEmployeeDeductionList();
    },
    error => console.log(error));
  }

  goToEmployeeDeductionList(){
    this.router.navigate(['/employee-deduction-list']);
  }

  onSubmit(){

    var myDeduction = this.getEmployeeDeductionByEmployeeId(this.employeeDeduction.employee.employeeId);
    var isThere = false;
    for (let index = 0; index < myDeduction.length; index++) {
      if((myDeduction[index].deduction.deductionName == this.employeeDeduction.deduction.deductionName)){
        isThere = true;
              }
            }
            if(isThere ){
            console.log("exiting can't save there was the same deduction before for this employee");
            }
            else{
              console.log(this.employeeDeduction);
             this.saveEmployeeDeduction();
              console.log("saved");
            }


  }


}
