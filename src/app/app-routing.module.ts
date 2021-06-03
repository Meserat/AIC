import { ConfirmResetComponent } from './confirm-reset/confirm-reset.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { UpdateIcfgradeComponent } from './update-icfgrade/update-icfgrade.component';
import { UpdateIncomeTaxComponent } from './update-income-tax/update-income-tax.component';
import { IncomeTaxListComponent } from './income-tax-list/income-tax-list.component';
import { EmployeeAllowanceListComponent } from './employee-allowance-list/employee-allowance-list.component';
import { UpdateEmployeeAllowanceComponent } from './update-employee-allowance/update-employee-allowance.component';
import { DeductionListComponent } from './deduction-list/deduction-list.component';
import { AllowanceListComponent } from './allowance-list/allowance-list.component';
import { LoginComponent } from './login/login.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import { CreateUserComponent } from './create-user/create-user.component';
import { UserListComponent } from './user-list/user-list.component';
import { UpdateEmployeeComponent } from './update-employee/update-employee.component';
import { CompanyListComponent } from './company-list/company-list.component';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EmployeeListComponent } from './employee-list/employee-list.component';
import { CreateAllowanceComponent } from './create-allowance/create-allowance.component';
import { CreateDeductionComponent } from './create-deduction/create-deduction.component';
import { UpdateDeductionComponent } from './update-deduction/update-deduction.component';
import { UpdateAllowanceComponent } from './update-allowance/update-allowance.component';
import { AllowanceDetailsComponent } from './allowance-details/allowance-details.component';
import { DeductionDetailsComponent } from './deduction-details/deduction-details.component';
import { CreateEmployeeAllowanceComponent } from './create-employee-allowance/create-employee-allowance.component';
import { EmployeeDeductionComponent } from './employee-deduction/employee-deduction.component';
import { UpdateEmployeeDeductionComponent } from './update-employee-deduction/update-employee-deduction.component';
import { SalaryListComponent } from './salary-list/salary-list.component';
import { CreateSalaryComponent } from './create-salary/create-salary.component';
import { UpdateSalaryComponent } from './update-salary/update-salary.component';
import { CreateEmployeeDeductionComponent } from './create-employee-deduction/create-employee-deduction.component';
import { CreateIncomeTaxComponent } from './create-income-tax/create-income-tax.component';
import { MonthlySalaryComponent } from './monthly-salary/monthly-salary.component';
import { PayrollDetailsComponent } from './payroll-details/payroll-details.component';
import { SectionListComponent } from './section-list/section-list.component';
import { PositionListComponent } from './position-list/position-list.component';
import { LevelListComponent } from './level-list/level-list.component';
import { UpdateSectionComponent } from './update-section/update-section.component';
import { UpdateLevelComponent } from './update-level/update-level.component';
import { UpdatePositionComponent } from './update-position/update-position.component';
import { CreateSectionComponent } from './create-section/create-section.component';
import { CreatePositionComponent } from './create-position/create-position.component';
import { CreateLevelComponent } from './create-level/create-level.component';
import { EmployeeHistoryComponent } from './employee-history/employee-history.component';
import { PayrollHistoryComponent } from './payroll-history/payroll-history.component';
import { AllowanceHistoryComponent } from './allowance-history/allowance-history.component';
import { DeductionHistoryComponent } from './deduction-history/deduction-history.component';
import { CreateIcfgradeComponent } from './create-icfgrade/create-icfgrade.component';
import { IcfgradeListComponent } from './icfgrade-list/icfgrade-list.component';
import { CreateDirectorateComponent } from './create-directorate/create-directorate.component';
import { DirectorateListComponent } from './directorate-list/directorate-list.component';
import { UpdateDirectorateComponent } from './update-directorate/update-directorate.component';
import { NonAuthGuard } from './non-auth.guard';
import { AuthGuard } from './auth.guard';
import { AppmenuComponent } from './appmenu/appmenu.component';
import { BackPaymentComponent } from './back-payment/back-payment.component';

const routes: Routes = [
  {
    path:'',component:LoginComponent,
    canActivate:[AuthGuard],
  },
    // path:'',
    // component: AppmenuComponent,
    // canActivate:[AuthGuard],
    // canActivateChild:[AuthGuard],children:[
      {
        path: 'hroffice',
        component: EmployeeListComponent,
      },
      {
        path: 'add-employee',
        component: CreateEmployeeComponent,
      },
      {
        path: 'list-company',
        component: CompanyListComponent,
      },
      {
        path: 'admin',
        component: UserListComponent,
      },
      {
        path: 'add-user',
        component: CreateUserComponent,
      },
      {
        path: 'update-employee/:id',
        component: UpdateEmployeeComponent,
      },
      {
        path: 'update-user/:id',
        component: UpdateUserComponent,

      },
      {
        path: 'allow',
        component: AllowanceListComponent,
      },
       {
        path: 'create-allow',
        component: CreateAllowanceComponent,
      },
     {
        path: 'create-dedu',
        component: CreateDeductionComponent,
      },
      {
        path: 'update-dedu/:id',
        component: UpdateDeductionComponent,
      },
       {
        path: 'update-allow/:id',
        component: UpdateAllowanceComponent,
      },
       {
        path: 'view-allowance/:id',
        component: AllowanceDetailsComponent,
      },
       {
        path: 'view-deduction/:id',
        component: DeductionDetailsComponent,
      },
      {
        path: 'dedu',
        component: DeductionListComponent,
      },
      // Employee Allowance
       {
        path: 'employee-allowance',
        component: EmployeeAllowanceListComponent,
      },

    {
        path: 'create-employee-allowance',
        component: CreateEmployeeAllowanceComponent,
      },

      {
        path: 'update-employee-allowance/:id',
        component: UpdateEmployeeAllowanceComponent,
      },
       {
        path: 'employee-allowance-list',
        component: EmployeeAllowanceListComponent,
      },
     // employee deduction
       {
        path: 'employee-deduction-list',
        component: EmployeeDeductionComponent,
      },
       {
        path: 'update-employee-deduction/:id',

        component: UpdateEmployeeDeductionComponent,
      },
       {
        path: 'create-employee-deduction',
        component: CreateEmployeeDeductionComponent,
      },
      // Income tax
      {
        path: 'income',
        component: IncomeTaxListComponent,
      },
      {
        path:"create-income",
        component:CreateIncomeTaxComponent

      },
      {
        path: 'update-income/:id',

        component: UpdateIncomeTaxComponent,
      },

    //salary
    {
        path: 'salary-list',
        component: SalaryListComponent,
      },
    {
        path: 'create-salary',
        component: CreateSalaryComponent,
      },
      {
        path: 'update-salary/:id',
        component: UpdateSalaryComponent,
      },

      {
        path: 'month',
        component: MonthlySalaryComponent,
        runGuardsAndResolvers: 'always'
      },

    {
        path: 'section',
        component: SectionListComponent,
      },

      {
        path: 'position',
        component: PositionListComponent,
      },

      {
        path: 'level',
        component: LevelListComponent,
      },
      // Update

    {
        path: 'update-section/:id',
        component: UpdateSectionComponent,
      },
      {
        path: 'update-level/:id',
        component: UpdateLevelComponent,
      },

      {
        path: 'update-position/:id',
        component: UpdatePositionComponent,
      },
      // create

    {
        path:"create-section",
        component:CreateSectionComponent

      },

      {
        path:"create-position",
        component:CreatePositionComponent

      },

      {
        path:"create-level",
        component:CreateLevelComponent

      },
      // for history

     {
        path:"employee-history",
        component:EmployeeHistoryComponent

      },
       {
        path:"payroll-history",
        component:PayrollHistoryComponent

      },
       {
        path:"allowance-history",
        component:AllowanceHistoryComponent

      },
       {
        path:"deduction-history",
        component:DeductionHistoryComponent

      },

        {
        path: 'payroll-details/:id',
        component: PayrollDetailsComponent,

      },
      // ICFG

     {
        path:"create-icfgrade",
        component:CreateIcfgradeComponent

      },
      {
        path:"icfgrade-list",
        component:IcfgradeListComponent

      },
       {
        path:"update-icfgrade/:id",
        component:UpdateIcfgradeComponent

      },
      // directorate
       {
        path:"create-directorate",
        component:CreateDirectorateComponent

      },
      {
        path:"directorate-list",
        component:DirectorateListComponent

      },
        {
        path:"forget-password",
        component:ForgotPasswordComponent,
        canActivate:[NonAuthGuard]
        },
        {
          path:"confirm-reset",
          component:ConfirmResetComponent,
          canActivate:[NonAuthGuard]
        },
       {
        path:"update-directorate/:id",
        component:UpdateDirectorateComponent

      },{
        path:"back-payment",
        component:BackPaymentComponent
      },
  //   ],
  // },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NonAuthGuard],
  },
  {
      path: '**',
      redirectTo: '',
      pathMatch: 'full',
  },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
