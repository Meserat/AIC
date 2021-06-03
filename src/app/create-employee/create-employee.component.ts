import { BackpaymentService } from './../backpayment.service';
import { BackPayment } from './../back-payment';
import { DirectorateService } from './../directorate.service';
import { Directorate } from './../directorate';
import { ICFGradeService } from '../icfgrade.service';
import { TokenStorageService } from './../token-storage.service';
import { LevelService } from './../level.service';
import { PositionService } from './../position.service';
import { Observable } from 'rxjs';
import { SalaryService } from './../salary.service';
import { EmployeeService } from './../employee.service';
import { Component, Input, OnInit } from '@angular/core';
import { Employee } from '../employee';
import {Salary} from "../salary"
import { Router } from '@angular/router';
import { Position } from '../position';
import { SectionService } from '../section.service';
import { Level } from '../level';

import { ICFGrade } from './../icfgrade';
import { Section } from '../section';



@Component({
  selector: 'app-create-employee',
  templateUrl: './create-employee.component.html',
  styleUrls: ['./create-employee.component.css']
})
export class CreateEmployeeComponent implements OnInit {
  icfGrades: ICFGrade [];
  @Input() level:Level;
  @Input() icfGrade:ICFGrade;


  backPayment:BackPayment = new BackPayment();
positions:Observable<Position []>
  positionId:number;
  @Input() position:Position
allEmployee:Employee[]
  salaries:Salary[]
  sections:Section[]
  directorates:Directorate[]


  manySalary:Salary[];
  levels:Observable<Level[]>

  employeeICFGrade:String;
  employeeLevel:String;
  employeeSalary:Salary = new Salary();
  employeeICFGrade1:ICFGrade=new ICFGrade();

  @Input() salary:Salary;
  message:String;

  // Check duplicate
  isPhoneDuplicate:Boolean=false;
  isAccountDuplicate:Boolean=false;
  isEmailDuplicate:Boolean=false;
  employee:Employee=new Employee();
  directorateList=[];
  employeeSection:Section=new Section();
  employees: Employee[];
  constructor(private employeService:EmployeeService,
   private salaryService:SalaryService,private positionService:PositionService,
   private levelService:LevelService, private tokenStorage:TokenStorageService,
   private backPaymentService:BackpaymentService,
   private icfGradeService:ICFGradeService,
   private sectionService:SectionService,
   private directorateService:DirectorateService,
   private employeeService:EmployeeService
    ,private router:Router) { }

    gotoEmployeelist(){
  this.router.navigate(["/hroffice"])
}



saveEmployee(){

  this.getDirectorateBySection();
  this.getSalaryByICFGradeLevel();
   this.employeService.createEmployee(this.employee).subscribe(data=>{
    this.gotoEmployeelist();
  },
 error=> console.log(error)
  )
}
getSalaryByICFGradeLevel() {
  this.salaries.forEach(salary=>{
    if((salary.icfGrade.icfGradeName == this.employeeICFGrade)&&
        (salary.level.levelName == this.employeeLevel)){
                this.employeeSalary = salary;
                this.employee.employeeSalary = this.employeeSalary;
        }
    });

  // this.backPayment.date = this.employee.date;
  // this.backPayment.employee = this.employee;
  // this.backPayment.previousAmount = 0;
  // this.backPayment.newAmount = this.employeeSalary.salaryAmount;

  // console.log(this.backPayment);

  // this.backPaymentService.createBackPayment(this.backPayment).subscribe(data=>{
  //   console.log(data);
  // });
}

getLevelData(){

  this.levels=this.levelService.getLevelList1();

}
getICFGradeData(){
  this.icfGradeService.getICFGradeList().subscribe(data=>{
    this.icfGrades= data;
  });

}

getSalaryData(){
  this.salaryService.getSalaryList().subscribe(data=>{
    this.salaries = data;

  });
}
// Load Position
getSalaryOfPosition(){
  this.positions=this.positionService.getPositionList1();

}

getSection(){
this.sectionService.getSectionList().subscribe(data=>{
  this.sections=data;
})

}
getDirectorate(){
  this.directorateService.getDirectoratesList().subscribe(data=>{
    this.directorates=data;
  })
}
getDirectorateBySection(){
  this.directorates.forEach(item=>{
    if(item.section.sectionId===this.employeeSection.sectionId){
      this.directorateList.push(item);
    }
  })
}
getEmployees(){
  this.employeeService.getEmployeesList().subscribe(data=>{
    this.employees = data;
  });

}

  ngOnInit(): void {

    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/']);
    }
    else{
      this.getICFGradeData();
      this.getSalaryData();
      this.getSalaryOfPosition();
      this.getLevelData();
      this.getSection();
      this.getDirectorate();
      this.getEmployees();
    }
}
  // previousAmount:number;
  // newAmount:number;
  // date:Date;
  // employee:Employee;
onSubmit(){
this.isPhoneDuplicate=false;
this.isAccountDuplicate=false;
this.isEmailDuplicate=false;
this.employees.forEach(item=>{
  if(item.employeePhoneNumber==this.employee.employeePhoneNumber){
    this.isPhoneDuplicate=true;
    }
   else if(item.employeeAccountNumber==this.employee.employeeAccountNumber){
     this.isAccountDuplicate=true;
   }
   else if(item.employeeEmail==this.employee.employeeEmail){
     this.isEmailDuplicate=true;
   }
});
if(this.isPhoneDuplicate || this.isEmailDuplicate || this.isAccountDuplicate){
    this.router.navigate['/add-user']
}
 else{
    this.saveEmployee();
  }
}
}
