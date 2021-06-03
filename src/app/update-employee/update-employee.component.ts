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


positions:Observable<Position []>
  positionId:number;
  @Input() position:Position

  salaries:Salary[]


  manySalary:Salary[];
  levels:Observable<Level[]>

  employeeICFGrade:String;
  employeeLevel:String;
  employeeSalary:Salary = new Salary();
  employeeICFGrade1:ICFGrade=new ICFGrade();

  @Input() salary:Salary;
  employee:Employee;
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

getSalaryByICFGradeLevel() {
  this.salaryService.getSalaryList().subscribe(data=>{
    data.forEach(salary=>{
    if((salary.icfGrade.icfGradeName == this.employee.employeeSalary.icfGrade.icfGradeName)&&
    (salary.level.levelName == this.employee.employeeSalary.level.levelName)){
      this.employeeSalary = salary;
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

getSalaryData(){
  this.salaryService.getSalaryList().subscribe(data=>{
    this.salaries = data;
    console.log(this.salaries);

  });
}
// Load Position
getSalaryOfPosition(){
  this.positions=this.positionService.getPositionList1();

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

      }, error => console.log(error));
    }
  }

  onSubmit(){
    this.getSalaryByICFGradeLevel()
    this.employee.employeeSalary = this.employeeSalary;
    this.employeService.updateEmployee(this.id, this.employee).subscribe( data =>{
      this.goToEmployeeList();
    }
    , error => console.log(error));
  }

  goToEmployeeList(){
    this.router.navigate(['/hroffice']);
  }
}
