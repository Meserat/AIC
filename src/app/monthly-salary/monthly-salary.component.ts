import { Allowance } from './../allowance';
import { IncomeTax } from './../income-tax';
import { Position } from './../position';
import { Deduction } from './../deduction';

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from './../employee.service';
import { Employee } from '../employee';

import { SalaryService } from './../salary.service'
import { Salary } from '../salary'

import { EmployeeAllowanceService } from './../employee-allowance.service'
import { EmployeeAllowance } from '../employee-allowance'
import { EmployeeDeduction } from '../employee-deduction';
import { EmployeeDeductionService } from '../employee-deduction.service';

import { AllowanceService } from '../allowance.service';
import { DeductionService } from '../deduction.service';

import { IncomeTaxService } from '../income-tax.service';
import { Subject } from 'rxjs';

// import monthly payroll details
import { MonthlyPayroll } from './../monthly-payroll';
import { TokenStorageService } from '../token-storage.service';
import { PayrollHistory } from '../payroll-history';
import { AllowanceHistory } from '../allowance-history';
import { DeductionHistory } from '../deduction-history';
import { DeductionHistoryService } from '../deduction-history.service';
import { AllowanceHistoryService } from '../allowance-history.service';
import { PayrollHistoryService } from '../payroll-history.service';

@Component({
  selector: 'app-monthly-salary',
  templateUrl: './monthly-salary.component.html',
  styleUrls: ['./monthly-salary.component.css']
})
export class MonthlySalaryComponent implements OnInit {
title = 'angulardatatables';
 closeResult: string;
  dtOptions: any = {};
  status=false;
  dtTrigger:Subject<any>=new Subject()


  employees:Employee[];
  salary:Salary[];
  employeeAllowances:EmployeeAllowance[];
  employeeDeductions:EmployeeDeduction[];
  allowances:Allowance[];
  deductions: Deduction[];
  incomeTaxes:IncomeTax[];
  monthlyPayrolls=[];
  monthlyPayroll;
  pension:number = 7;
  allowanceColumns:number=0;
  deducitonColumns:number=0;


  time:String;
  historyP: PayrollHistory = new PayrollHistory();
  historyA: AllowanceHistory = new AllowanceHistory();
  historyD: DeductionHistory = new DeductionHistory();
  self: any;


  constructor( private employeeService:EmployeeService,
    private salaryService:SalaryService,
    private employeeAllowanceService:EmployeeAllowanceService,
    private employeeDeductionService: EmployeeDeductionService,
    private allowanceService: AllowanceService,
    private deductionService: DeductionService,
    private incomeTaxeService: IncomeTaxService,
    private pHistoryService:PayrollHistoryService,
    private aHistoryService:AllowanceHistoryService,
    private dHistoryService:DeductionHistoryService,
    private tokenStorage:TokenStorageService,
    private route:ActivatedRoute,
     private router: Router){}

     // load datas
     private getAllAllowance() {
    this.allowanceService.getAllowancesList().subscribe(data=>{
      this.allowances = data;;
     //    this.dtTrigger.next();
    })
  }
  private getAllDeduction(){
    this.deductionService.getDeductionsList().subscribe(data=>{
      this.deductions = data;
        // this.dtTrigger.next();
    })
  }
  private getAllTaxe(){
    this.incomeTaxeService.getIncomeTaxList().subscribe(data=>{
      this.incomeTaxes = data;
       //  this.dtTrigger.next();
    })
  }

  private getEmployeeAllowanceByEmployeeId(employeeId:number){
    return this.employeeAllowances.filter(item=>item.employee.employeeId==employeeId);
  }

  private getEmployeeDeductionByEmployeeId(employeeId:number){
    return this.employeeDeductions.filter(item => item.employee.employeeId==employeeId);
  }
   private getSalary(){
    this.salaryService.getSalaryList().subscribe(data=>{
      this.salary=data;
       //  this.dtTrigger.next();
    })
  }
   public getIncomeTaxe(basicSalary:number){
    var taxe:any;
    var temp = 0;
    for (taxe=0;taxe<this.incomeTaxes.length;taxe++){
      if(basicSalary<=this.incomeTaxes[taxe].incomeTaxMax && basicSalary>=this.incomeTaxes[taxe].incomeTaxMin ){
        temp = basicSalary*(this.incomeTaxes[taxe].incomeTaxpercentage)/100 - this.incomeTaxes[taxe].incomeTaxOffSet;
      }
    }
    return temp;
  }
  private getEmployeeAllowance(){
    this.employeeAllowanceService.getEmployeeAllowanceList().subscribe(data=>{
      this.employeeAllowances=data;
        // this.dtTrigger.next();
    })
  }
  private getEmployeeDeduciton(){
    this.employeeDeductionService.getEmployeeDeductionList().subscribe(data=>{
      this.employeeDeductions = data;
        // this.dtTrigger.next();
    })
  }

  reloadView():void{
    let currentUrl =  this.router.url;
    this.router.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
      this.router.navigate([currentUrl]);
    })
  }
  public calculateDeduction(basicSalary:number,
    deduction:number, deductionType:String){
    if (deductionType =="PERCENTAGE"){
      return basicSalary*deduction/100;
    }
    else if(deductionType=="AMOUNT"){
      return deduction;
    }
    else if(deductionType=="MONTH" && deduction != 0){
      return (basicSalary - this.getIncomeTaxe(basicSalary) - (basicSalary*this.pension)/100)/deduction;
    }
    else{
      return 0;
    }
  }



  private getEmployees(){
    var self = this;
    var temp=0;
    this.employeeService.getEmployeesList().subscribe(data=>{
      this.employees=data;
          this.employees.forEach(function(value, key) {
            var newDate=new Date(value.date);
              self.monthlyPayroll=new MonthlyPayroll()
              self.monthlyPayroll.employeeId=value.employeeId;
              self.monthlyPayroll.firstName=value.employeeFirstName;
              self.monthlyPayroll.lastName=value.employeeLastName;
              self.monthlyPayroll.phoneNumber=value.employeePhoneNumber;
              self.monthlyPayroll.accountNumber=value.employeeAccountNumber;
              self.monthlyPayroll.salary=value.employeeSalary.salaryAmount;
              self.monthlyPayroll.difference = value.position.positionSalary-value.employeeSalary.salaryAmount;
                if(self.monthlyPayroll.difference <= 0){
                  self.monthlyPayroll.difference = 0;
              }
              self.monthlyPayroll.totalSalary = value.employeeSalary.salaryAmount+self.monthlyPayroll.difference;
              self.monthlyPayroll.position = value.position.positionName;
              self.monthlyPayroll.Allowance=new Map<string, string>();

              self.getEmployeeAllowanceByEmployeeId(value.employeeId).forEach(function(value2,key2) {
              self.monthlyPayroll.Allowance.set(value2.allowance.allowanceName,value2.amount);
              temp += value2.amount;
              // self.allowanceColumns +=1;
              })
              self.monthlyPayroll.totalAllowance = temp;
              temp=0;

              self.monthlyPayroll.grossSalary = self.monthlyPayroll.totalSalary+self.monthlyPayroll.totalAllowance;
              self.monthlyPayroll.Deduction=new Map<string, string>();
              self.getEmployeeDeductionByEmployeeId(value.employeeId).forEach(function(value3,key3) {
               self.monthlyPayroll.Deduction.set(value3.deduction.deductionName,value3.amount);
              temp += self. calculateDeduction(self.monthlyPayroll.totalSalary, value3.amount, value3.deduction.deductionType);

                })

              self.monthlyPayroll.incomeTax = self.getIncomeTaxe(self.monthlyPayroll.grossSalary);
              self.monthlyPayroll.pension = ((self.pension/100)*self.monthlyPayroll.totalSalary);
              self.monthlyPayroll.totalDeduction = temp+self.monthlyPayroll.incomeTax+self.monthlyPayroll.pension;
              temp=0;

              self.monthlyPayroll.netSalary = ((self.monthlyPayroll.grossSalary)-(self.monthlyPayroll.totalDeduction));

              if(value.status){
                if(!((newDate.getFullYear() == (new Date().getFullYear())) &&
                    (newDate.getMonth() == (new Date()).getMonth()) &&
                    (1<newDate.getDate() && newDate.getDate()<30))){

                   self.monthlyPayrolls.push(self.monthlyPayroll);
                              }
              }

         });
         this.dtTrigger.next();
    })
  }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("ACCOUNTANT")){
      this.router.navigate(['/'])
    }
else{
this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      bDestory:true,
    dom: 'lBfrtip',
        buttons: [
           {
            extend:'csv',
              charset: 'utf-8',
             bom: true,
            title:"Artifical Intelligence Centre",
             messageTop:"Payroll report, "+ new Date(),
            messageBottom:"Approved by:"+JSON.parse(window.localStorage.getItem('role')).username,
            exportOptions:{
         columns:[':visible:not(:last-child)']

            }
          },
          {
            extend:'excel',
            charset: 'utf-8',
             bom: true,
            title:"Artifical Intelligence Centre",
            messageTop:"Payroll report, "+ new Date(),
            messageBottom:"Approved by:"+JSON.parse(window.localStorage.getItem('role')).username,
            exportOptions:{
             columns:[':visible:not(:last-child)']


            },

          },
           {
                extend: 'pdfHtml5',
                 charset: 'utf-8',
            bom: true,
                customize: function ( doc ) {
                    doc.content.splice( 1, 0, {
                        margin: [ 0, 0, 0, 12 ],
                        alignment: 'center',
                        image: 'data:image/png;base64,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'




                      } );
                }
            },
            {
            extend:'print',
            charset: 'utf-8',
            bom: true,
            title:"Artifical Intelligence Centre",
            messageTop:"Payroll report, "+ new Date(),

            messageBottom:"Approved by:"+JSON.parse(window.localStorage.getItem('role')).username,
            footer: true,
            exportOptions:{
            columns:[':visible:not(:last-child)']
            }
          },
          'colvis',
        ]

    };

    this.getSalary();
    this.getAllAllowance();
    this.getAllDeduction();
    this.getEmployeeAllowance();
    this.getAllTaxe();
    this.getEmployeeDeduciton();
    this.getEmployees();
  }
}
  saveHistory(){

    var self = this;
    var temp=0;
    this.employees.forEach(item=>{
      var newDate=new Date(item.date);
      this.monthlyPayroll = new MonthlyPayroll()
      this.historyP.time = this.time;
      this.historyP.employeeId = item.employeeId;
      this.historyP.employeeFirstName = item.employeeFirstName;
      this.historyP.employeeLastName = item.employeeLastName;
      this.historyP.employeePhoneNumber = item.employeePhoneNumber;
      this.historyP.employeeEmail = item.employeeEmail;
      this.historyP.employeeAccountNumber = item.employeeAccountNumber;
      this.historyP.employeeSection = item.employeeSalary.icfGrade.icfGradeName;
      this.historyP.employeeLevel = item.employeeSalary.level.levelName;
      this.historyP.employeeBasicSalary = item.employeeSalary.salaryAmount;
      this.historyP.employeePosition= item.position.positionName;
      this.historyP.employeePositionSalary = item.position.positionSalary;

      this.historyP.difference = item.position.positionSalary-item.employeeSalary.salaryAmount;
              if(self.historyP.difference <= 0){
                  self.historyP.difference = 0;
              }
      this.historyP.totalSalary = item.employeeSalary.salaryAmount+self.historyP.difference;
      // self.monthlyPayroll.Allowance = new Map<string, string>();
      self.getEmployeeAllowanceByEmployeeId(item.employeeId).forEach(function(value2,key2) {
      self.monthlyPayroll.Allowance.set(value2.allowance.allowanceName,value2.amount);
              temp += value2.amount;
              // self.allowanceColumns +=1;
              })
      this.historyP.totalAllowances = temp;
              temp=0;

      self.historyP.grossSalary = self.historyP.totalSalary+self.historyP.totalAllowances;
      // self.monthlyPayroll.Deduction=new Map<string, string>();
      self.getEmployeeDeductionByEmployeeId(item.employeeId).forEach(function(value3,key3) {
        self.monthlyPayroll.Deduction.set(value3.deduction.deductionName,value3.amount);
        temp += self. calculateDeduction(self.historyP.totalSalary, value3.amount, value3.deduction.deductionType);
      });

      self.historyP.incomeTax = self.getIncomeTaxe(self.historyP.grossSalary);
      self.historyP.pension = ((self.pension/100)*self.monthlyPayroll.totalSalary);
      self.historyP.totalDeductions = temp+self.historyP.incomeTax+self.monthlyPayroll.pension;
      temp=0;
      self.historyP.netSalary = ((self.historyP.grossSalary)-(self.historyP.totalDeductions));

      if(item.status){
        if(!((newDate.getFullYear() == (new Date().getFullYear())) &&
            (newDate.getMonth() == (new Date()).getMonth()) &&
            (1<newDate.getDate() && newDate.getDate()<30))){
              this.pHistoryService.createPayrollList(this.historyP).subscribe(data=>{
              },error => console.log(error));
                this.status=true;
       }
      }
    });
  }
   payrollDetails(employeeId: number){
    this.router.navigate(['payroll-details', employeeId]).then(()=>{
        window.location.reload();
      });
  }
}
