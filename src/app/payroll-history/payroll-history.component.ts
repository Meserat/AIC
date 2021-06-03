import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Allowance } from '../allowance';
import { AllowanceHistory } from '../allowance-history';
import { AllowanceHistoryService } from '../allowance-history.service';
import { DeductionHistory } from '../deduction-history';
import { DeductionHistoryService } from '../deduction-history.service';
import { PayrollHistory } from '../payroll-history';
import { PayrollHistoryService } from '../payroll-history.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-payroll-history',
  templateUrl: './payroll-history.component.html',
  styleUrls: ['./payroll-history.component.css']
})
export class PayrollHistoryComponent implements OnInit {

  title = 'angulardatatables';
  closeResult: string;
  dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject()

  employeeHistory:any;
  allowanceHistory:AllowanceHistory[];
  deductionHistory:DeductionHistory[];
  date:String;
  ee=[];
  ehTime=[];
  newTime=[];

  allowanceName=[];
  newAllowanceName=[];
  deductionName=[];
  newDeductionName=[];


  constructor(private employeeHistoryService:PayrollHistoryService, private allowanceHistoryService:AllowanceHistoryService,
    private deductionHistoryService:DeductionHistoryService,    private router: Router,
    private tokenStorage:TokenStorageService,
    private modalService: NgbModal) { }

    private getPayrollHistory(){
      this.employeeHistoryService.getPayrollHistoryList().subscribe(data=>{
        this.employeeHistory=data;
        data.forEach(item=>{this.ehTime.push(item.time);});
        this.newTime =Array.from(new Set(this.ehTime));
        console.log(this.employeeHistory);


      })

     console.log("after")
      console.log(this.employeeHistory);


    }

       private getAllowanceHistroy(){
        this.allowanceHistoryService.getAllowanceHistoryList().subscribe(data=>{
          this.allowanceHistory=data;
          console.log("Aloowances1")
          console.log(this.allowanceHistory);
          data.forEach(item=>{
            this.allowanceName.push(item.allowanceName);
          });

          this.newAllowanceName =Array.from(new Set(this.allowanceName));


        })
      }
        private getDeductionHistory(){
          this.deductionHistoryService.getDeductionHistoryList().subscribe(data=>{
            this.deductionHistory=data;
            data.forEach(item=>{
              this.deductionName.push(item.deductionName);
            });

            this.newDeductionName =Array.from(new Set(this.deductionName));

          })

    }
  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("ACCOUNTANT")){
      this.router.navigate(['/'])
    }else{
      this.dtOptions = {
            pagingType: 'full_numbers',
            pageLength: 10,
            processing: true,


          };
          this.getPayrollHistory();
          this.getAllowanceHistroy();
          this.getDeductionHistory();
          this.allowanceDeductionFind();
          this.dtTrigger.next();
          }
  }




  searchByDate(){
    this.ee=[];
    this.ee.push( this.employeeHistory.filter(item => item.time === this.date));

  }


              allowanceDeductionFind(){
                var self=this;
                console.log(self.employeeHistory)

                self.employeeHistory.forEach(function(value, key) {


                  self.employeeHistory.Allowance=new Map<string, string>();
                  self.allowanceHistory.filter(item=>item.employeeId == value.employeeId).forEach(function(value2,key2){
                    self.employeeHistory.Allowance.set(value2.allowanceName, value2.allowanceAmount)});

                  self.employeeHistory.Deduction=new Map<string, string>();
                  self.deductionHistory.filter(item=>item.employeeId == value.employeeId).forEach(function(value3,key3){
                    self.employeeHistory.Deduction.set(value3.deductionName, value3.deductionAmount)});

                    self.employeeHistory.push(self.employeeHistory);
                    console.log("Test")


                    console.log(self.employeeHistory);

                });





}
  reload(){
    this.router.navigate(["/payroll-history"])
   }
}

