import { Interceptor } from './interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule, HTTP_INTERCEPTORS} from "@angular/common/http"
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { AppRoutingModule } from './app-routing.module';
import {FormsModule} from "@angular/forms"
import { HttpClient} from '@angular/common/http';
import { AppComponent } from './app.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import {DataTablesModule} from  "angular-datatables";
import { UserListComponent } from './user-list/user-list.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { LoginComponent } from './login/login.component';
import { AllowanceListComponent } from './allowance-list/allowance-list.component';
import { DeductionListComponent } from './deduction-list/deduction-list.component';
import { CreateAllowanceComponent } from './create-allowance/create-allowance.component';
import { CreateDeductionComponent } from './create-deduction/create-deduction.component';
import { UpdateAllowanceComponent } from './update-allowance/update-allowance.component';
import { UpdateDeductionComponent } from './update-deduction/update-deduction.component';
import { AllowanceDetailsComponent } from './allowance-details/allowance-details.component';
import { DeductionDetailsComponent } from './deduction-details/deduction-details.component';
import { EmployeeAllowanceListComponent } from './employee-allowance-list/employee-allowance-list.component';
import { CreateEmployeeAllowanceComponent } from './create-employee-allowance/create-employee-allowance.component';
import { UpdateEmployeeAllowanceComponent } from './update-employee-allowance/update-employee-allowance.component';
import { EmployeeDeductionComponent } from './employee-deduction/employee-deduction.component';
import { UpdateEmployeeDeductionComponent } from './update-employee-deduction/update-employee-deduction.component';
import { CreateEmployeeDeductionComponent } from './create-employee-deduction/create-employee-deduction.component';
import { IncomeTaxListComponent } from './income-tax-list/income-tax-list.component';
import { SalaryListComponent } from './salary-list/salary-list.component';
import { UpdateSalaryComponent } from './update-salary/update-salary.component';
import { CreateSalaryComponent } from './create-salary/create-salary.component';
import { CreateIncomeTaxComponent } from './create-income-tax/create-income-tax.component';
import { UpdateIncomeTaxComponent } from './update-income-tax/update-income-tax.component';
import { MonthlySalaryComponent } from './monthly-salary/monthly-salary.component';
import { PayrollDetailsComponent } from './payroll-details/payroll-details.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SectionListComponent } from './section-list/section-list.component';
import { PositionListComponent } from './position-list/position-list.component';
import { LevelListComponent } from './level-list/level-list.component';
import { CreatePositionComponent } from './create-position/create-position.component';
import { CreateLevelComponent } from './create-level/create-level.component';
import { CreateSectionComponent } from './create-section/create-section.component';
import { UpdatePositionComponent } from './update-position/update-position.component';
import { UpdateLevelComponent } from './update-level/update-level.component';
import { UpdateSectionComponent } from './update-section/update-section.component';
import { AppheaderComponent } from './appheader/appheader.component';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { EmployeeHistoryComponent } from './employee-history/employee-history.component';
import { PayrollHistoryComponent } from './payroll-history/payroll-history.component';
import { DeductionHistoryComponent } from './deduction-history/deduction-history.component';
import { AllowanceHistoryComponent } from './allowance-history/allowance-history.component';
import { CreateIcfgradeComponent } from './create-icfgrade/create-icfgrade.component';
import { IcfgradeListComponent } from './icfgrade-list/icfgrade-list.component';
import { UpdateIcfgradeComponent } from './update-icfgrade/update-icfgrade.component';
import { CreateDirectorateComponent } from './create-directorate/create-directorate.component';
import { DirectorateListComponent } from './directorate-list/directorate-list.component';
import { UpdateDirectorateComponent } from './update-directorate/update-directorate.component';
import { AppButtonComponent } from './app-button/app-button.component';
import { ToastrModule } from 'ngx-toastr';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { MessagesDropdownMenuComponent } from './appheader/messages-dropdown-menu/messages-dropdown-menu.component';
import { NotificationsDropdownMenuComponent } from './appheader/notifications-dropdown-menu/notifications-dropdown-menu.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { BackPaymentComponent } from './back-payment/back-payment.component';
import { ConfirmResetComponent } from './confirm-reset/confirm-reset.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeeListComponent,
    CreateEmployeeComponent,
    CompanyListComponent,
    UpdateEmployeeComponent,
    UserListComponent,
    CreateUserComponent,
    UpdateUserComponent,
    LoginComponent,
    AllowanceListComponent,
    DeductionListComponent,
    CreateAllowanceComponent,
    CreateDeductionComponent,
    UpdateAllowanceComponent,
    UpdateDeductionComponent,
    AllowanceDetailsComponent,
    DeductionDetailsComponent,
    EmployeeAllowanceListComponent,
    CreateEmployeeAllowanceComponent,
    UpdateEmployeeAllowanceComponent,
    EmployeeDeductionComponent,
    UpdateEmployeeDeductionComponent,
    CreateEmployeeDeductionComponent,
    IncomeTaxListComponent,
    SalaryListComponent,
    UpdateSalaryComponent,
    CreateSalaryComponent,
    CreateIncomeTaxComponent,
    UpdateIncomeTaxComponent,
    MonthlySalaryComponent,
    PayrollDetailsComponent,
    SectionListComponent,
    PositionListComponent,
    LevelListComponent,
    CreatePositionComponent,
    CreateLevelComponent,
    CreateSectionComponent,
    UpdatePositionComponent,
    UpdateLevelComponent,
    UpdateSectionComponent,
    AppheaderComponent,
    AppmenuComponent,
    EmployeeHistoryComponent,
    PayrollHistoryComponent,
    DeductionHistoryComponent,
    AllowanceHistoryComponent,
    CreateIcfgradeComponent,
    IcfgradeListComponent,
    UpdateIcfgradeComponent,
    CreateDirectorateComponent,
    DirectorateListComponent,
    UpdateDirectorateComponent,
    AppButtonComponent,
    MessagesDropdownMenuComponent,
    NotificationsDropdownMenuComponent,
    ForgotPasswordComponent,
    BackPaymentComponent,

    ConfirmResetComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    NgbModule,
    ReactiveFormsModule,
     TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: httpTranslateLoader,
        deps: [HttpClient]
      }
    }),
    ConfirmationPopoverModule.forRoot({
    confirmButtonType: 'danger', // set defaults here
    }),
    ToastrModule.forRoot({
      timeOut:10000,
      positionClass:'toast-bottom-right',
      preventDuplicates:true,
    }),
    NgbModule,
  ],
  providers: [
    {provide:HTTP_INTERCEPTORS, useClass:Interceptor, multi: true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

// AOT compilation support
export function httpTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http);
}
