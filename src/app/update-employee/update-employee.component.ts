import { Level } from './../level';
import { TokenStorageService } from './../token-storage.service';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Employee } from '../employee';
import { EmployeeService } from '../employee.service';
import { LevelService } from '../level.service';
import { Position } from '../position';
import { PositionService } from '../position.service';
import { Salary } from '../salary';
import { SalaryService } from '../salary.service';
import { ICFGrade } from '../icfgrade';
import { ICFGradeService } from '../icfgrade.service';
import { Section } from '../section';
import { Directorate } from '../directorate';
import { DirectorateService } from '../directorate.service';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-update-employee',
  templateUrl: './update-employee.component.html',
  styleUrls: ['./update-employee.component.css']
})
export class UpdateEmployeeComponent implements OnInit {

  id:number;
  icfGrades: ICFGrade [];
  @Input() level:Level;
  @Input() icfGrade:ICFGrade;
  sections:Section[]
  directorates:Directorate[]


positions:Position [];
  positionId:number;
  @Input() position:Position

  salaries:Salary[]


  manySalary:Salary[];
  levels:Observable<Level[]>

  employeeICFGrade:String;
  employeeLevel:String;
  employeeDirectorate:String;
  employeePositionSalary:Number;
  employeeType:String;
  employeeSalary:Salary = new Salary();
  newPosition:Position = new Position();
  newDirectorate:Directorate = new Directorate();
  employeeICFGrade1:ICFGrade=new ICFGrade();

  @Input() salary:Salary;
  employee:Employee;
  employeePositionName: String;
  constructor(private employeService:EmployeeService,
  private salaryService:SalaryService,private positionService:PositionService,
  private levelService:LevelService, private tokenStorage:TokenStorageService,
  private icfGradeService:ICFGradeService,private router:Router,
  private sectionService:SectionService,
  private directorateService:DirectorateService,
  private route:ActivatedRoute) { }

    gotoEmployeelist(){
  this.router.navigate(["/hroffice"])
}
setDirectorate(){
  this.directorates.forEach(dir=>{
    if(dir.directorateName == this.employeeDirectorate){
      this.newDirectorate = dir;
    }
  })
}
getSalaryByICFGradeLevel() {
  console.log(this.employeeICFGrade);
  this.salaryService.getSalaryList().subscribe(data=>{
    data.forEach(salary=>{
      if((salary.icfGrade.icfGradeName == this.employeeICFGrade) &&
      (salary.level.levelName == this.employeeLevel)){
        this.employeeSalary = salary;
        console.log(salary);
    }
  });
  console.log(data)
  })
}

getLevelData(){

  this.levels=this.levelService.getLevelList1();

}
getICFGradeData(){
  this.icfGradeService.getICFGradeList().subscribe(data=>{
    this.icfGrades= data;
    console.log(this.icfGrades);
  });

}
setEmployeePosition(){
  this.positions.forEach(pos=>{
    if(pos.positionName == this.employeePositionName){
      this.newPosition = pos;
    }
  })

}
getSalaryData(){
  this.salaryService.getSalaryList().subscribe(data=>{
    this.salaries = data;

  });
}
// Load Position
getSalaryOfPosition(){
  this.positionService.getPositionList().subscribe(data=>{
    this.positions = data;
  })

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
// getICFGrade(){
//   this.icfGradeService.getICFGradeList1().subscribe(data=);
//   console.log("Here  weh"+this.icfGrades)

// }

  ngOnInit(): void {

    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/']);
    }
    else{
      this.getICFGradeData();
      this.getSalaryData();
      this.getSalaryOfPosition();
      this.getLevelData();
      this.getDirectorate();
      this.getSection();

      this.id = this.route.snapshot.params['id'];
      this.employeService.getEmployeeById(this.id).subscribe(data => {
      this.employee = data;
      this.employeeICFGrade = data.employeeSalary.icfGrade.icfGradeName;
      this.employeeLevel = data.employeeSalary.level.levelName;
      this.employeeDirectorate=data.employeeDirectorate.directorateName;
      this.employeePositionName  = data.position.positionName;
      this.employeeType=data.employeeType;


      }, error => console.log(error));
    }
  }

  onSubmit(){
    this.getSalaryByICFGradeLevel();
    this.setDirectorate();
    this.setEmployeePosition();

    this.employee.employeeSalary = this.employeeSalary;
    this.employee.position = this.newPosition;
    this.employee.employeeDirectorate = this.newDirectorate;

    console.log(this.employeeSalary);

    this.employeService.updateEmployee(this.id, this.employee).subscribe( data =>{
      this.goToEmployeeList();
    }  , error => console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/hroffice']);
  }
}
