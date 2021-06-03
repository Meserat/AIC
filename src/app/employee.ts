import { Directorate } from './directorate';
import { EmployeeDeduction } from './employee-deduction';
import { Deduction } from './deduction';
import { Position } from './position';
import { EmployeeAllowance } from './employee-allowance';
import { Salary } from "./salary";
import { Section } from './section';
import { Level } from './level';
import { ICFGrade } from './icfgrade';
export class Employee {
  employeeId:number;
  employeeFirstName:String;
  employeeLastName:String
  employeePhoneNumber:number;
  employeeEmail:String;
  employeeAccountNumber:String;
  employeeSalary:Salary;
  employeeDirectorate:Directorate;
  position:Position;
  employeeType:String;
  status:boolean = true;
  date:Date=new Date();

}
