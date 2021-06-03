import { DeductionHistory } from './deduction-history';
import { AllowanceHistory } from './allowance-history';


export class PayrollHistory {
 employeeId:number;
  employeeFirstName:String;
  employeeLastName:String
  employeePhoneNumber:number;
  employeeEmail:String;
  employeeAccountNumber:String;
  employeeBasicSalary:Number;
  employeeSection:String;
  employeeLevel:String;
  employeePosition:String;
  employeePositionSalary:Number;
  totalSalary:number;
  time:String;
  totalAllowances:number;
  grossSalary:number;
  incomeTax:number;
  pension:number;
  difference:number;
  totalDeductions:number;
  netSalary:number;
  Allowance:Map<string, string>;
  Deduction:Map<string, string>;



}
