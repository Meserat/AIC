import { TokenStorageService } from './../token-storage.service';
import { EmployeeAllowance } from './../employee-allowance';
import { Component, Input, OnInit } from '@angular/core';
import { EmployeeAllowanceService } from '../employee-allowance.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AllowanceService } from '../allowance.service';
import { Allowance } from '../allowance';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { forEach } from 'jszip';

@Component({
  selector: 'app-create-employee-allowance',
  templateUrl: './create-employee-allowance.component.html',
  styleUrls: ['./create-employee-allowance.component.css']
})
export class CreateEmployeeAllowanceComponent implements OnInit {

 employeeAllowance: EmployeeAllowance = new EmployeeAllowance();
 existingAllowances: EmployeeAllowance[];

  // Start here
 allowances:Observable <Allowance[]>
 employees:Observable <Employee[]>
//  tasks: DataSource;
selectAllModeVlaue: string = "page";
selectionModeValue: string = "all";

  allowanceId:number;

  selectedValue:number;
  @Input() allowance:Allowance;
   @Input() employee:Employee;

  constructor(private employeeAllowanceService: EmployeeAllowanceService,
    private allowanceService:AllowanceService,private tokenStorage:TokenStorageService,
    private employeeService:EmployeeService,
    private router: Router) { }

    reloadData(){
  this.allowances=this.allowanceService.getAllowanceList1();
   this.employees=this.employeeService.getEmployeeList1();
}
private getEmployeeAllowanceByEmployeeId(employeeId:number){
  return this.existingAllowances.filter(item=>item.employee.employeeId==employeeId);
}
  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("ACCOUNTANT")){
      this.router.navigate(['/']);
    }
    else{
    this.employeeAllowanceService.getEmployeeAllowanceList().subscribe(data=>{
      this.existingAllowances = data;
    });
    }
  }
  // from employee

  // end here


  saveEmployeeAllowance(){
    this.employeeAllowanceService.createEmployeeAllowance(this.employeeAllowance)
    .subscribe( data =>{
      console.log(data);
      this.goToEmployeeAllowanceList();
    },
    error => console.log(error));
  }

  goToEmployeeAllowanceList(){
    this.router.navigate(['/employee-allowance-list'])

}
 onSubmit(){

var myAllowances = this.getEmployeeAllowanceByEmployeeId(this.employeeAllowance.employee.employeeId);
var isThere = false;
for (let index = 0; index < myAllowances.length; index++) {
  if((myAllowances[index].allowance.allowanceName == this.employeeAllowance.allowance.allowanceName)){
    isThere = true;
          }
        }
        if(isThere ){
        console.log("exiting there was the same allowance for this employee");
        }
        else{
          this.saveEmployeeAllowance();
          console.log("saved successfully");
        }
 }
}
