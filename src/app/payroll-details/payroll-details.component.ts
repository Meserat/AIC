import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Allowance } from '../allowance';
import { AllowanceService } from '../allowance.service';
import { Deduction } from '../deduction';
import { DeductionService } from '../deduction.service';
import { Employee } from '../employee';
import { EmployeeAllowance } from '../employee-allowance';
import { EmployeeAllowanceService } from '../employee-allowance.service';
import { EmployeeDeduction } from '../employee-deduction';
import { EmployeeDeductionService } from '../employee-deduction.service';
import { EmployeeService } from '../employee.service';
import { IncomeTax } from '../income-tax';
import { IncomeTaxService } from '../income-tax.service';
import { MonthlyPayroll } from './../monthly-payroll';
import { Salary } from '../salary';
import { SalaryService } from '../salary.service';
import { ViewChild, ElementRef  } from '@angular/core';
import jsPDF from 'jspdf';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
pdfMake.vfs = pdfFonts.pdfMake.vfs;
import htmlToPdfmake from 'html-to-pdfmake';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-payroll-details',
  templateUrl: './payroll-details.component.html',
  styleUrls: ['./payroll-details.component.css']
})
export class PayrollDetailsComponent implements OnInit {

  printComponent(cmpName) {
     let printContents = document.getElementById(cmpName).innerHTML;
     let originalContents = document.body.innerHTML;

     document.body.innerHTML = printContents;

     window.print();

     document.body.innerHTML = originalContents;
}

  // for export
  @ViewChild('pdfTable') pdfTable: ElementRef;

  //PDF genrate button click function
  public downloadAsPDF() {
    const doc = new jsPDF();
    //get table html
    const pdfTable = this.pdfTable.nativeElement;
    //html to pdf format
    var html = htmlToPdfmake(pdfTable.innerHTML);

    const documentDefinition = { content: DOCUMENT };
    pdfMake.createPdf(documentDefinition).open();
  }
  // upt0 here
  id: number
  employees:Employee[];
  salary:Salary[];
  employeeAllowances:EmployeeAllowance[];
  employeeDeductions:EmployeeDeduction[];
  allowances:Allowance[];
  deductions: Deduction[];
  incomeTaxes:IncomeTax[];
  monthlyPayroll;
  monthlyPayrolls=[];

  payrollDetail:MonthlyPayroll  = new  MonthlyPayroll();
  pension:number = 7;

  constructor(
    private salaryService:SalaryService,
    private employeeAllowanceService:EmployeeAllowanceService,
    private employeeDeductionService: EmployeeDeductionService,
    private allowanceService: AllowanceService,
    private deductionService: DeductionService,
    private incomeTaxeService: IncomeTaxService,
    private employeeService:EmployeeService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.getSalary();
    this.getAllAllowance();
    this.getAllDeduction();
    this.getEmployeeAllowance();
    this.getEmployeeDeduciton();
    this.getAllTaxe();
    this.getEmployees()


  }

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

        if(self.id == value.employeeId){
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
              temp +=value2.amount;
              // self.allowanceColumns +=1;
              })
              self.monthlyPayroll.totalAllowance = temp;
              temp=0;

              self.monthlyPayroll.grossSalary = self.monthlyPayroll.totalSalary+self.monthlyPayroll.totalAllowance;

              self.monthlyPayroll.Deduction=new Map<string, string>();
              self.getEmployeeDeductionByEmployeeId(value.employeeId).forEach(function(value3,key3) {
              self.monthlyPayroll.Deduction.set(value3.deduction.deductionName,value3.amount);
              temp+=self. calculateDeduction(self.monthlyPayroll.totalSalary, value3.amount, value3.deduction.deductionType);

                })

              self.monthlyPayroll.incomeTax = self.getIncomeTaxe(self.monthlyPayroll.totalSalary+self.monthlyPayroll.totalAllowance);
              self.monthlyPayroll.pension = ((self.pension/100)*self.monthlyPayroll.totalSalary);
              self.monthlyPayroll.totalDeduction = temp+self.monthlyPayroll.incomeTax+self.monthlyPayroll.pension;
              temp=0;

              self.monthlyPayroll.netSalary = self.monthlyPayroll.grossSalary-self.monthlyPayroll.totalDeduction;

              self.payrollDetail= self.monthlyPayroll;

            //  }
             if(value.status){
                  self.monthlyPayrolls.push(self.monthlyPayroll);
              }
              console.log("Hello Pensin "+self.monthlyPayroll.pension);

            }
         });

        //  this.dtTrigger.next();
    })

  }

  // private getEmployees(){
  //     var self = this;
  //     var temp=0;
  //   this.employeeService.getEmployeesList().subscribe(data=>{
  //     this.employees=data;
  //         this.employees.forEach(function(value, key) {

  //             self.monthlyPayroll=new MonthlyPayroll()
  //             self.monthlyPayroll.employeeId=value.employeeId;
  //             self.monthlyPayroll.firstName=value.employeeFirstName;
  //             self.monthlyPayroll.lastName=value.employeeLastName;
  //             self.monthlyPayroll.phoneNumber=value.employeePhoneNumber;
  //             self.monthlyPayroll.accountNumber=value.employeeAccountNumber;
  //             self.monthlyPayroll.salary=value.employeeSalary.salaryAmount;
  //             self.monthlyPayroll.difference = value.position.positionSalary-value.employeeSalary.salaryAmount;
  //               if(self.monthlyPayroll.difference <= 0){
  //                self.monthlyPayroll.difference = 0;
  //             }
  //             self.monthlyPayroll.totalSalary = value.employeeSalary.salaryAmount+self.monthlyPayroll.difference;
  //             self.monthlyPayroll.position = value.position.positionName;

  //             self.monthlyPayroll.Allowance=new Map<string, string>();

  //             self.getEmployeeAllowanceByEmployeeId(value.employeeId).forEach(function(value2,key2) {
  //             self.monthlyPayroll.Allowance.set(value2.allowance.allowanceName,value2.amount);
  //             temp +=value2.amount;
  //             // self.allowanceColumns +=1;
  //             })
  //             self.monthlyPayroll.totalAllowance = temp;
  //             temp=0;

  //             self.monthlyPayroll.grossSalary = self.monthlyPayroll.totalSalary+self.monthlyPayroll.totalAllowance;

  //             self.monthlyPayroll.Deduction=new Map<string, string>();
  //             self.getEmployeeDeductionByEmployeeId(value.employeeId).forEach(function(value3,key3) {
  //              self.monthlyPayroll.Deduction.set(value3.deduction.deductionName,value3.amount);
  //             temp+=self. calculateDeduction(self.monthlyPayroll.totalSalary, value3.amount, value3.deduction.deductionType);

  //               })

  //             self.monthlyPayroll.incomeTax = self.getIncomeTaxe(self.monthlyPayroll.totalSalary+self.monthlyPayroll.totalAllowance);
  //             self.monthlyPayroll.pension = ((self.pension/100)*self.monthlyPayroll.totalSalary);
  //             self.monthlyPayroll.totalDeduction = temp+self.monthlyPayroll.incomeTax+self.monthlyPayroll.pension;
  //             temp=0;

  //             self.monthlyPayroll.netSalary = self.monthlyPayroll.grossSalary-self.monthlyPayroll.totalDeduction;

  //             if(value.status){
  //                 self.monthlyPayrolls.push(self.monthlyPayroll);
  //             }
  //             console.log("Hello "+self.monthlyPayroll.pension);

  //        });
  //        //this.dtTrigger.next();
  //   })
  // }


  private getSalary(){
    this.salaryService.getSalaryList().subscribe(data=>{
      this.salary=data;
       //  this.dtTrigger.next();
    })
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

  // for allowance list


  }

