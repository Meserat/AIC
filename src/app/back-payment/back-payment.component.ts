import { BackPayment } from './../back-payment';
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

import { Allowance } from '../allowance';
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
  selector: 'app-back-payment',
  templateUrl: './back-payment.component.html',
  styleUrls: ['./back-payment.component.css']
})
export class BackPaymentComponent implements OnInit {
title = 'angulardatatables';
 closeResult: string;
  dtOptions: any = {};
  status=false;
  dtTrigger:Subject<any>=new Subject()


  employees:Employee[];
  backPayments=[];
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
      var newDate;
      var regDate;
    this.employeeService.getEmployeesList().subscribe(data=>{
      this.employees=data;
      data.forEach(item=>{
      newDate = new Date(item.date);
        if((newDate.getFullYear == (new Date().getFullYear)) && (newDate.getMonth() == (new Date()).getMonth())){
        console.log(newDate.getFullYear())
        console.log(newDate.getMonth())
        console.log(newDate.getDate())
        if((1<newDate.getDate()) && (newDate.getDate()<30)){
          this.backPayments.push(item);

          console.log(this.backPayments)
        }
      }
    })
          this.backPayments.forEach(function(value, key) {

     console.log("Date")
     console.log(value.date.getDate)
        regDate = new Date(value.date);

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
              self.monthlyPayroll.totalSalary = (((value.employeeSalary.salaryAmount)+(self.monthlyPayroll.difference))*
               (30-regDate.getDate()))/30;
               console.log("Date")
               console.log(newDate.getDate)
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
              temp += self. calculateDeduction(self.monthlyPayroll.totalSalary, value3.amount, value3.deduction.deductionType);

                })

              self.monthlyPayroll.incomeTax = self.getIncomeTaxe(self.monthlyPayroll.totalSalary+self.monthlyPayroll.totalAllowance);
              self.monthlyPayroll.pension = (((self.pension/100)*self.monthlyPayroll.totalSalary));
              self.monthlyPayroll.totalDeduction = temp+self.monthlyPayroll.incomeTax+self.monthlyPayroll.pension*(30-regDate.getDate())/30;
              temp=0;

              self.monthlyPayroll.netSalary = (self.monthlyPayroll.grossSalary-self.monthlyPayroll.totalDeduction);

              if(value.status){
                  self.monthlyPayrolls.push(self.monthlyPayroll);
              }
              console.log("Hello "+self.monthlyPayroll.pension);

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
    buttons: [
          {
            extend:'copy',
            exportOptions:{
               columns:[':visible:not(:last-child)']

            }
          },
          {
            extend:'csv',
            title:"Artifical Intelligence Centre",
             messageTop:"Payroll report, "+ new Date(),
            messageBottom:"Approved by",
            exportOptions:{
         columns:[':visible:not(:last-child)']

            }
          },
          {
            extend:'excel',
            title:"Artifical Intelligence Centre",
            messageTop:"Payroll report, "+ new Date(),
            messageBottom:"Approved by :",
            exportOptions:{
             columns:[':visible:not(:last-child)']

            }
          },
            {
            extend:'print',
  title:"Artifical Intelligence Centre",
            messageTop:"Payroll report, "+ new Date(),
            messageBottom:"Approved by:",



           exportOptions:{
             columns:[':visible:not(:last-child)']

             }
          },
          'colvis',
        ],
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      bDestory:true,
    dom: 'lBfrtip',


    };

    this.getSalary();
    this.getAllAllowance();
    this.getAllDeduction();
    this.getEmployeeAllowance();
    this.getAllTaxe();
    this.getEmployeeDeduciton();
    this.getEmployees();


}
//  this.reloadView();
  }



   //history saving

  saveHistory(){




   var self=this;
   var temp=0;

    this.backPayments.forEach(item=>{
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


        //saving Allowances
                     var self = this;
                  this.getEmployeeAllowanceByEmployeeId(item.employeeId).forEach(function(value2,key2) {
                        self.historyA.employeeId = value2.employee.employeeId;
                        self.historyA.allowanceName = value2.allowance.allowanceName;
                        self.historyA.allowanceAmount = value2.amount;
                        self.historyA.time = self.time;
                        temp +=value2.amount;
                        console.log(self.historyA)
                        self.aHistoryService.createAllowanceHistory(self.historyA).subscribe( data =>{

                              console.log("After converted"+self.historyA.allowanceName);
                            },
                        error => console.log(error));
                      })
                      console.log("all"+temp);
                this.historyP.totalAllowances = temp;
                  temp=0;


            //saving deductions
                        this.getEmployeeDeductionByEmployeeId(item.employeeId).forEach(function(value3,key3) {

                        self.historyD.employeeId = value3.employee.employeeId;
                        self.historyD.deductionName = value3.deduction.deductionName;
                        self.historyD.dedectionType = value3.deduction.deductionType;
                        self.historyD.deductionAmount = value3.amount;
                        self.historyD.time = self.time;

                        temp += self. calculateDeduction(self.monthlyPayroll.totalSalary, value3.amount, value3.deduction.deductionType);


                        self.dHistoryService.createDeductionHistory(self.historyD).subscribe( data =>{
                          console.log(data);
                        },
                            error => console.log(error));

                          })

                       this.historyP.totalDeductions=temp+self.monthlyPayroll.incomeTax+self.monthlyPayroll.pension;

                       temp=0;

                       this.historyP.grossSalary =  self.monthlyPayroll.totalSalary+self.monthlyPayroll.totalAllowance;
                       this.historyP.incomeTax = self.getIncomeTaxe(self.monthlyPayroll.totalSalary+self.monthlyPayroll.totalAllowance);
                       this.historyP.netSalary =  self.monthlyPayroll.grossSalary-self.monthlyPayroll.totalDeduction;





                        //saving payroll
              this.pHistoryService.createPayrollList(this.historyP).subscribe( data =>{
                                              }

                                               ,
               error => console.log(error));


                    })

                    this.status=true;



                  }



// For purpose of Navigation

   payrollDetails(employeeId: number){
    this.router.navigate(['payroll-details', employeeId]).then(()=>{
        window.location.reload();
      });
  }

  }




