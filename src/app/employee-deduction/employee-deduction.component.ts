import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeductionService } from './../deduction.service';
import { Setadeduction } from './../setadeduction';
import { EmployeeService } from './../employee.service';
import { Deduction } from './../deduction';
import { EmployeeDeduction } from './../employee-deduction';
import { Component, OnInit } from '@angular/core';
import { EmployeeDeductionService } from '../employee-deduction.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Employee } from '../employee';
import { element } from 'protractor';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-employee-deduction',
  templateUrl: './employee-deduction.component.html',
  styleUrls: ['./employee-deduction.component.css']
})
export class EmployeeDeductionComponent implements OnInit {
  employeeDeductions:EmployeeDeduction[];
  employeeDeduction:EmployeeDeduction = new EmployeeDeduction();
  selectedDeduction:String;
  closeResult:String;
  dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject()
  employees:Employee[];
  employeesId=[];
  deductions:Deduction[];
  deductionLists = [];
  deductionList;
  checkboxStatus = new Map<number, Boolean>();
  allcheckboxStatus:Boolean = false;
  allcheckbox:Boolean = true;
  id:number;
  constructor(private employeeDeductionService: EmployeeDeductionService,
    private employeeService:EmployeeService, private deductionService:DeductionService, private modalService:NgbModal,
    private router: Router,
    private tokenStorage:TokenStorageService) { }

    private getEmployeeDeductions(){
    this.employeeDeductionService.getEmployeeDeductionList().subscribe(data => {
      this.employeeDeductions = data;
      this.dtTrigger.next();
    });
  }

  public removeOrAddAll(){
    if(this.allcheckboxStatus){
      this.employeesId=[];
      this.deductionLists.forEach(list=>{
      this.checkboxStatus.set(list.employeeId,false);
      });
    }
    else{
      this.employeesId=[];
      this.deductionLists.forEach(list=>{
        this.employeesId.push(list.employeeId)
        this.checkboxStatus.set(list.employeeId,true);
      });
    }
    console.log(this.employeesId);
    // window.location.reload();
  }
  public removeOrAddEmployee(employeeId:number){
    var index = this.employeesId.indexOf(employeeId);
    if(!this.checkboxStatus.get(employeeId)){
      if( index >-1){
      this.employeesId.splice(index, 1);
    }
    console.log(this.employeesId);
    console.log(this.checkboxStatus);
      }
    else{
      this.checkboxStatus.set(employeeId,true);
      this.employeesId.push(employeeId);
      console.log(this.employeesId);
      console.log(this.checkboxStatus);
    }
    // window.location.reload();
  }

  public saveManyEmployeeDeduction(){
    this.employees.forEach(element => {
      this.employeesId.forEach(id=>{
        if(element.employeeId == id){
          this.employeeDeduction.employee = element;
          var myDeduction = this.employeeDeductions.filter(item=>item.employee.employeeId == id);
          var isThere = false;
          for (let index = 0; index < myDeduction.length; index++) {
            if((myDeduction[index].deduction.deductionName == this.employeeDeduction.deduction.deductionName)){
              isThere = true;
              this.id = myDeduction[index].employeeDeductionId;
              break;
              }
            }
            if(isThere){
              console.log(this.employeeDeduction);
              this.employeeDeductionService.deleteEmployeeDeduction(this.id).subscribe(data=>{
                  console.log(data);
                },error=>console.log(error));
                this.employeeDeductionService.createEmployeeDeduction(this.employeeDeduction).subscribe( data =>{
                console.log(data);
                }, error => console.log(error));
                console.log(this.employeeDeduction);
              // this.employeeDeductionService.updateEmployeeDeduction(this.id, this.employeeDeduction).subscribe(data=>{
              //   console.log(data);
              // });
            }
            else{
              this.employeeDeductionService.createEmployeeDeduction(this.employeeDeduction).subscribe( data =>{
                console.log(data);
                }, error => console.log(error));
                console.log(this.employeeDeduction);
                }
          }
      })
    });
this.router.navigate(['/employee-deduction-list']).then(()=>{
        window.location.reload();
      });
  }
  public deleteManyEmployeeDeduction(){
    this.employeeDeductions.forEach(element=>{
      this.employeesId.forEach(id=>{
        if(element.employee.employeeId == id &&
          element.deduction.deductionName == this.employeeDeduction.deduction.deductionName){
          this.employeeDeductionService.deleteEmployeeDeduction(element.employeeDeductionId).subscribe(data=>{
            console.log(data);
          },error=>console.log(error));
        }
      })
    });
     this.router.navigate(['/employee-deduction-list']).then(()=>{
        window.location.reload();
      });
  }

  private getAlldeDuction(){
    this.deductionService.getDeductionsList().subscribe(data=>{
      this.deductions = data;
      console.log(data);
    })
  }
  private getAllEmployee(){
    this.employeeService.getEmployeesList().subscribe(data=>{
      this.employees = data;
      console.log(data);
    })
  }
 private getEmployees(){
    var self = this;
    this.employeeService.getEmployeesList().subscribe(data=>{
      this.employees=data;
          this.employees.forEach(function(value, key) {

              self.deductionList = new Setadeduction();
              self.deductionList.employeeId=value.employeeId;
              self.deductionList.firstName=value.employeeFirstName;
              self.deductionList.lastName=value.employeeLastName;
              self.deductionList.deduction=new Map<string, string>();

              self.getEmployeeDeductionByEmployeeId(value.employeeId).forEach(function(value2,key2) {
              self.deductionList.deduction.set(value2.deduction.deductionName,value2.amount);
              })

              self.deductionLists.push(self.deductionList);
              self.employeesId.push(value.employeeId);
              self.checkboxStatus.set(value.employeeId,true);
              console.log(self.employeesId);

    });
        //  this.dtTrigger.next();
    })


  }
  private getEmployeeDeductionByEmployeeId(employeeId:number){
    return this.employeeDeductions.filter(item=>item.employee.employeeId==employeeId);
  }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("ACCOUNTANT")){
      this.router.navigate(['/']);

    }

    else{
this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      processing: true,
      // dom: 'Bfrtip',
      //   buttons: [
      //     {
      //       extend:'copy',
      //       exportOptions:{
      //         columns:[0,1,2,3,4]

      //       }
      //     },
      //     {
      //       extend:'csv',
      //       exportOptions:{
      //         columns:[0,1,2,3,4]

      //       }
      //     },
      //     {
      //       extend:'excel',
      //       exportOptions:{
      //         columns:[0,1,2,3,4]

      //       }
      //     },
      //       {
      //       extend:'print',
      //       exportOptions:{
      //         columns:[0,1,2,3,4]

      //       }
      //     }

      //   ]
    };


    this.getAllEmployee();
    this.getAlldeDuction();
    this.getEmployeeDeductions();
    this.getEmployees();

    }

  }



  // employeedeductionDetails(id: number){
  //   this.router.navigate(['employee-details', id]);
  // }

  updateEmployeeDeduction(employeeDeductionId: number){
    this.router.navigate(['update-employee-deduction', employeeDeductionId]);
  }

  deleteEmployeeDeduction(employeeDeductionId: number){
    this.employeeDeductionService.deleteEmployeeDeduction(employeeDeductionId).subscribe( data => {
      console.log(data);
      this.getEmployeeDeductions();
      this.reload();
    })
  }

 reload(){
    this.router.navigateByUrl("/employee-deduction-list")
 }

  // delete confirmation
  // delete Confirmation

open(content: any, employeeDeductionId: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteEmployeeDeduction(employeeDeductionId);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
}
