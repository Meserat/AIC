import { TokenStorageService } from './../token-storage.service';
import { Deduction } from './../deduction';
import { EmployeeDeduction } from './../employee-deduction';
import { Component, Input, OnInit } from '@angular/core';
import { EmployeeDeductionService } from '../employee-deduction.service';
import { ActivatedRoute, Router } from '@angular/router';
import { DeductionService } from '../deduction.service';
import { EmployeeService } from '../employee.service';
import { Employee } from '../employee';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-update-employee-deduction',
  templateUrl: './update-employee-deduction.component.html',
  styleUrls: ['./update-employee-deduction.component.css']
})
export class UpdateEmployeeDeductionComponent implements OnInit {
  // start
   // Start here
 deductions:Observable <Deduction[]>
 employees:Observable <Employee[]>
 existingDeduction: EmployeeDeduction[];

  deductionId:number;

  selectedValue:number;
  @Input() allowance:Deduction;
   @Input() employee:Employee;

  constructor(private employeeDeductionService: EmployeeDeductionService,
    private route: ActivatedRoute,
    private router: Router,
    private deductionService:DeductionService,
    private employeeService:EmployeeService,
    private tokenStorage:TokenStorageService
    ) { }

    reloadData(){
  this.deductions=this.deductionService.getDeductionsList();
   this.employees=this.employeeService.getEmployeeList1();
}
  // end



    id: number;
  employeeDeduction: EmployeeDeduction = new EmployeeDeduction();
  private getEmployeeDeductionByEmployeeId(employeeId:number){
    return this.existingDeduction.filter(item=>item.employee.employeeId==employeeId);
  }
  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("ACCOUNTANT")){
      this.router.navigate(['/']);
    }
    else{
      this.id = this.route.snapshot.params['id'];
      this.reloadData();

      this.employeeDeductionService.getEmployeeDeductionList().subscribe(data=>{
        this.existingDeduction = data;
      });

      this.employeeDeductionService.getEmployeeDeductionById(this.id).subscribe(data => {
        this.employeeDeduction = data;
      }, error => console.log(error));
    }
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
              this.employeeDeductionService.updateEmployeeDeduction(this.id, this.employeeDeduction).subscribe( data =>{
                this.goToEmployeeDeductionList();
              }
              , error => console.log(error));
            }
  }

  goToEmployeeDeductionList(){
    this.router.navigate(['/employee-deduction-list']);
  }

}
