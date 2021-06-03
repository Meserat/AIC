import { UserService } from './../user.service';
import { Router } from '@angular/router';
import { EmployeeService } from './../employee.service';
//import { Component, OnInit } from '@angular/core';
import { Employee } from '../employee';

import { SalaryService } from './../salary.service'
import { Salary } from '../salary'
import { Subject } from 'rxjs';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { TokenStorageService } from '../token-storage.service';
import { EmployeeHistory } from '../employee-history';
import { EmployeeHistoryService } from '../employee-history.service';
import { Users } from '../users';

//import { DataTablesModule } from 'angular-datatables';


@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {




title = 'angulardatatables';
closeResult: string;
  dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject()
  status=false;
employees:Employee[];
users:Users[];
salary:Salary[];

history: EmployeeHistory = new EmployeeHistory();

  private getEmployees(){
  this.employeeService.getEmployeesList().subscribe(data=>{
    this.employees=data;
    console.log(this.employees);
    this.dtTrigger.next();

  })
}
// dtOptions:any={};
  constructor( private employeeService:EmployeeService,
    private salaryService:SalaryService, private historyService:EmployeeHistoryService, private router: Router,
    private tokenStorage:TokenStorageService,
    private userService:UserService,
    private modalService: NgbModal) {}
  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/'])
    }
    else{
this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 12,
      processing: true,
      bDestory:true,
      dom: 'lBfrtip',


        buttons: [


          {
            extend:'csv',
             charset: 'utf-8',
            bom: true,
            title:"Artifical Intelligence Centre Employee List",
        messageTop:"Payroll report, "+ new Date(),
        exportOptions: {
        columns: [0,1, 2, 3, 4,5,6,7,8,9,10]
                }
          },
          {
            extend:'excel',
             charset: 'utf-8',
            bom: true,
            title:"Artifical Intelligence Centre Employee List",
            messageTop:"Employee Information report, "+ new Date(),
            exportOptions: {
              columns: [0,1, 2, 3, 4,5,6,7,8,9,10]
                }
          },
            {
            extend:'print',
            charset: 'utf-8',
            bom: true,

            title:"Artifical Intelligence Center Employee list",
            messageTop:"Employee Information report, "+ new Date(),

            exportOptions: {
              columns: [0,1, 2, 3, 4,5,6,7,8,9,10]
                }
          },

               'colvis',
               [ 'colvisRestore' ]
        ]


    };

    this.getEmployees();
    this.getSalary();
    }
}

private getSalary(){
  this.salaryService.getSalaryList().subscribe(data=>{
    this.salary=data;
  })
}

updateEmployee(id: number){
    this.router.navigate(['update-employee', id]);

  }

// delete Confirmation

open(content: any, employeeId: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteEmployee(employeeId);
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


deleteEmployee(employeeId:number){
  this.employeeService.deleteEmployee(employeeId).subscribe(data=>{
    console.log(data)
      this.router.navigate(["/hroffice"]).then(()=>{
        window.location.reload();
      });

  })

}

saveHistory(){

  this.employees.forEach(item=>{
    this.history.employeeFirstName = item.employeeFirstName;
    this.history.employeeLastName = item.employeeLastName;
    this.history.employeePhoneNumber = item.employeePhoneNumber;
    this.history.employeeEmail = item.employeeEmail;
    this.history.employeeAccountNumber = item.employeeAccountNumber;
    this.history.employeeSection = item.employeeSalary.icfGrade.icfGradeName;
    this.history.employeeLevel = item.employeeSalary.level.levelName;
    this.history.employeeBasicSalary = item.employeeSalary.salaryAmount;
    this.history.employeePosition= item.position.positionName;
    this.history.employeePositionSalary = item.position.positionSalary;

    this.historyService.createEmployeeHistory(this.history).subscribe( data =>{
        console.log(data);
      },
    error => console.log(error));

  })
this.status=true;
}
searchStatusInactive(){

   this.employeeService.getEmployeesList().subscribe(data=>{
   this.employees= data.filter(item=>item.status==false)
   })
   console.log(this.employees)
}

searchStatusActive(){
  this.employeeService.getEmployeesList().subscribe(data=>{
   this.employees= data.filter(item=>item.status==true)
   })
   console.log(this.employees)
}
}
