import { TokenStorageService } from './../token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';

import { EmployeeAllowance } from './../employee-allowance';
import { Component, Input, OnInit } from '@angular/core';
import { EmployeeAllowanceService } from '../employee-allowance.service';
import { Observable } from 'rxjs';
import { AllowanceService } from '../allowance.service';
import { Allowance } from '../allowance';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';

@Component({
  selector: 'app-update-employee-allowance',
  templateUrl: './update-employee-allowance.component.html',
  styleUrls: ['./update-employee-allowance.component.css']
})
export class UpdateEmployeeAllowanceComponent implements OnInit {

  // start
   // Start here
 allowances:Observable <Allowance[]>
 employees:Observable <Employee[]>

  allowanceId:number;

  selectedValue:number;
  @Input() allowance:Allowance;
   @Input() employee:Employee;

  constructor(private employeeAllowanceService: EmployeeAllowanceService,
    private allowanceService:AllowanceService,
    private employeeService:EmployeeService,
     private route: ActivatedRoute,
     private tokenStorage:TokenStorageService,
    private router: Router) { }

    reloadData(){
  this.allowances=this.allowanceService.getAllowanceList1();
   this.employees=this.employeeService.getEmployeeList1();
}
  // end
  id: number;
  employeeAllowance: EmployeeAllowance = new EmployeeAllowance();
  existingAllowances: EmployeeAllowance[];

  ngOnInit(): void {
     if(!this.tokenStorage.isLogedIn("ACCOUNTANT")){
      this.router.navigate(['/']);
    }
    else{
      this.id = this.route.snapshot.params['id'];
      this.reloadData();

      this.employeeAllowanceService.getEmployeeAllowanceList().subscribe(data=>{
        this.existingAllowances = data;
      });

      this.employeeAllowanceService.getEmployeeAllowanceById(this.id).subscribe(data => {
        this.employeeAllowance = data;
      }, error => console.log(error));
    }
    }

  private getEmployeeAllowanceByEmployeeId(employeeId:number){
    return this.existingAllowances.filter(item=>item.employee.employeeId==employeeId);
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
        console.log("exiting without saving there is another allowance with the same name");
        }
    else{
       this.employeeAllowanceService.updateEmployeeAllowance(this.id, this.employeeAllowance).subscribe( data =>{
            this.goToEmployeeAllowanceList();}
          , error => console.log(error));
          console.log("saved successfully");
        }
  }

  goToEmployeeAllowanceList(){
    this.router.navigate(['/employee-allowance-list']);
  }

}
