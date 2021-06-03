import { EmployeeAllowance } from './../employee-allowance';
import { Setallowance } from './../setallowance';
import { AllowanceService } from './../allowance.service';
import { Allowance } from './../allowance';
import { EmployeeService } from './../employee.service';
import { Component, OnInit } from '@angular/core';
import { EmployeeAllowanceService } from '../employee-allowance.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Subject } from 'rxjs';
import { Employee } from '../employee';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-employee-allowance-list',
  templateUrl: './employee-allowance-list.component.html',
  styleUrls: ['./employee-allowance-list.component.css']
})
export class EmployeeAllowanceListComponent implements OnInit {
  employeeAllowances:EmployeeAllowance[];
  employeeAllowance:EmployeeAllowance = new EmployeeAllowance();
  selectedAllowance:String;
  closeResult:String;
  dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject()
  employees:Employee[];
  employeesId=[];
  allowances:Allowance[];
  allowanceLists = [];
  allowanceList;
  id:number;
  checkboxStatus = new Map<number, Boolean>();
  allcheckboxStatus:Boolean = false;
  allcheckbox:Boolean = true;
  constructor(private employeeAllowanceService: EmployeeAllowanceService,
    private employeeService:EmployeeService, private allowanceService:AllowanceService,
    private modalService: NgbModal, private router: Router,
    private tokenStorage:TokenStorageService
    ) { }

    private getEmployeeAllowances(){
    this.employeeAllowanceService.getEmployeeAllowanceList().subscribe(data => {
      this.employeeAllowances = data;
      this.dtTrigger.next();
    });
  }

  public removeOrAddAll(){
    if(this.allcheckboxStatus){
      this.employeesId=[];
      this.allowanceLists.forEach(list=>{
      this.checkboxStatus.set(list.employeeId,false);
      });
    }
    else{
      this.employeesId=[];
      this.allowanceLists.forEach(list=>{
        this.employeesId.push(list.employeeId)
        this.checkboxStatus.set(list.employeeId,true);
      });
    }
    console.log(this.employeesId);
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
  }
  public saveManyEmployeeAllownce(){
      this.employees.forEach(element => {
      this.employeesId.forEach(id=>{
        if(element.employeeId==id){
          this.employeeAllowance.employee = element;
          this.employeeAllowanceService.createEmployeeAllowance(this.employeeAllowance).subscribe( data =>{
            console.log(data);
          }, error => console.log(error));
          console.log(this.employeeAllowance);
        }
      })
    });

   this.router.navigate(['/employee-allowance-list']).then(()=>{
        window.location.reload();
      });  }
  private getAllAllowance(){
    this.allowanceService.getAllowancesList().subscribe(data=>{
      this.allowances = data;
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

              self.allowanceList = new Setallowance();
              self.allowanceList.employeeId=value.employeeId;
              self.allowanceList.firstName=value.employeeFirstName;
              self.allowanceList.lastName=value.employeeLastName;
              self.allowanceList.Allowance=new Map<string, string>();

              self.getEmployeeAllowanceByEmployeeId(value.employeeId).forEach(function(value2,key2) {
              self.allowanceList.Allowance.set(value2.allowance.allowanceName,value2.amount);
              })

              self.allowanceLists.push(self.allowanceList);
              self.employeesId.push(value.employeeId);
              self.checkboxStatus.set(value.employeeId,true);
              console.log(self.employeesId);

        });
        //  this.dtTrigger.next();
    })
  }

  public saveManyEmployeeAllowance(){
    this.employees.forEach(element => {
      this.employeesId.forEach(id=>{
        if(element.employeeId == id){
          this.employeeAllowance.employee = element;
          var myallowance = this.employeeAllowances.filter(item=>item.employee.employeeId == id);
          var isThere = false;
          for (let index = 0; index < myallowance.length; index++) {
            if((myallowance[index].allowance.allowanceName == this.employeeAllowance.allowance.allowanceName)){
              isThere = true;
              this.id = myallowance[index].employeeAllowanceId;

              break;
              }
            }
            if(isThere){
              console.log(this.employeeAllowance);
              this.employeeAllowanceService.deleteEmployee(this.id).subscribe(data=>{
                  console.log(data);
                },error=>console.log(error));
                this.employeeAllowanceService.createEmployeeAllowance(this.employeeAllowance).subscribe( data =>{
                console.log(data);

                }, error => console.log(error));
                console.log(this.employeeAllowance);

              // this.employeeAllowanceService.updateEmployeeAllowance(this.id, this.employeeAllowance).subscribe(data=>{
              //   console.log(data);
              // });
            }
            else{
              this.employeeAllowanceService.createEmployeeAllowance(this.employeeAllowance).
              subscribe( data =>{

                console.log(data);
                }, error => console.log(error));
                console.log(this.employeeAllowance);
                }
          }
      })
    })

  this.router.navigate(['/employee-allowance-list']).then(()=>{
        window.location.reload();
      });

  }

  public deleteManyEmployeeAllowance(){
    this.employeeAllowances.forEach(element=>{
      this.employeesId.forEach(id=>{
        if(element.employee.employeeId == id &&
          element.allowance.allowanceName == this.employeeAllowance.allowance.allowanceName){
          this.employeeAllowanceService.deleteEmployee(element.employeeAllowanceId).subscribe(data=>{
            console.log(data);
          },error=>console.log(error));
        }
      })
    });
     this.router.navigate(['/employee-allowance-list']).then(()=>{
        window.location.reload();
      });
    }
  private getEmployeeAllowanceByEmployeeId(employeeId:number){
    return this.employeeAllowances.filter(item=>item.employee.employeeId==employeeId);
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

    };

    this.getAllEmployee();
    this.getAllAllowance();
    this.getEmployeeAllowances();
    this.getEmployees();


    }
 }



  // employeeAllowanceDetails(id: number){
  //   this.router.navigate(['employee-details', id]);
  // }




  updateEmployeeAllowance(employeeAllowanceId: number){
    this.router.navigate(['update-employee-allowance', employeeAllowanceId]);
  }

  deleteEmployeeAllowance(employeeAllowanceId: number){
    this.employeeAllowanceService.deleteEmployee(employeeAllowanceId).subscribe( data => {
      console.log(data);
      this.getEmployeeAllowances();


    })
  }
  // delete confirmation
  // delete Confirmation

open(content: any, employeeAllowanceId: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteEmployeeAllowance(employeeAllowanceId);
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
