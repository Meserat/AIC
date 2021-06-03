import { MonthlyPayroll } from './../../monthly-payroll';
import { IncomeTax } from './../../income-tax';
import { EmployeeAllowance } from './../../employee-allowance';
import { EmployeeDeduction } from './../../employee-deduction';
import { Employee } from './../../employee';
import { BackPayment } from './../../back-payment';
import {
  Component,
  OnInit,
  ViewChild,
  HostListener,
  ElementRef,
  Renderer2,
} from '@angular/core';
import { Allowance } from 'src/app/allowance';
import { Deduction } from 'src/app/deduction';
import { Salary } from 'src/app/salary';
import { PayrollHistory } from 'src/app/payroll-history';
import { AllowanceHistory } from 'src/app/allowance-history';
import { DeductionHistory } from 'src/app/deduction-history';
import { ActivatedRoute, Router } from '@angular/router';
import { BackpaymentService } from 'src/app/backpayment.service';
import { TokenStorageService } from 'src/app/token-storage.service';
import { EmployeeService } from 'src/app/employee.service';

@Component({
  selector: 'app-notifications-dropdown-menu',
  templateUrl: './notifications-dropdown-menu.component.html',
  styleUrls: ['./notifications-dropdown-menu.component.css'],
})
export class NotificationsDropdownMenuComponent implements OnInit {
  backPayments:BackPayment[];
  notifyBackPayment=[];
  employees:Employee[];
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideDropdownMenu();
    }
  }

  constructor(
    private tokenStorage:TokenStorageService,
    private employeeService:EmployeeService,
    private route:ActivatedRoute,
    private router: Router,
    private backPaymentService:BackpaymentService,
    private elementRef: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    this.backPaymentService.getBackPaymentList().subscribe(data=>{
      this.backPayments = data;
      console.log(this.backPayments);
      console.log(data);
    });
    // this.backPayments.forEach(item=>{
    //   if(item.date.getMonth == (new Date()).getMonth){
    //     if((1 < item.date.getDate[1]) && (item.date.getDay<(new Date()).getDay)){
    //       this.notifyBackPayment.push(item);
    //       console.log(this.notifyBackPayment);
    //     }
    //   }
    // })
    this.employeeService.getEmployeesList().subscribe(data=>{
      this.employees=data;
      data.forEach(item=>{
      var newDate = new Date(item.date);
        if((newDate.getFullYear == (new Date().getFullYear)) && (newDate.getMonth() == (new Date()).getMonth())){
        console.log(newDate.getFullYear())
        console.log(newDate.getMonth())
        console.log(newDate.getDate())
        if((1<newDate.getDate()) && (newDate.getDate()<30)){
          this.notifyBackPayment.push(item);

        }
      }
    })
  })


  }
  toggleDropdownMenu() {
    if (this.dropdownMenu.nativeElement.classList.contains('show')) {
      this.hideDropdownMenu();
    } else {
      this.showDropdownMenu();
    }
  }

  showDropdownMenu() {
    this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
  }

  hideDropdownMenu() {
    this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
  }
}
