import { ICFGrade } from './../icfgrade';
import { TokenStorageService } from './../token-storage.service';
import { LevelService } from './../level.service';
import { Salary } from './../salary';
import { Component, Input, OnInit } from '@angular/core';
import { SalaryService } from '../salary.service';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Level } from '../level';
import { ICFGradeService } from '../icfgrade.service';

@Component({
  selector: 'app-create-salary',
  templateUrl: './create-salary.component.html',
  styleUrls: ['./create-salary.component.css']
})
export class CreateSalaryComponent implements OnInit {

  salary: Salary = new Salary();



  ICFGradeId:number;

  levels:Observable<Level[]>
  levelId:number;

  salaries:Observable <Salary[]>
  icfGrades:Observable <ICFGrade []>;
  @Input() level:Level;
  @Input() icfGrade:ICFGrade;


  constructor(private salaryService: SalaryService,
    private icfGradeService:ICFGradeService,
    private tokenStorage:TokenStorageService,
    private levelService:LevelService,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/']);
    }
    else{
      this.getICFGradeData();
      this.getLevelData();
    }

  }


  saveSalary(){
    this.salaryService.createSalary(this.salary).subscribe( data =>{
       this.goToSalaryList();
    },
    error => console.log(error));
  }

  goToSalaryList(){
    this.router.navigate(['/salary-list']);
  }
  // for dropdown
  // Load Position
getICFGradeData(){
 this.icfGrades= this.icfGradeService.getICFGradeList();

}

getLevelData(){
  this.levels=this.levelService.getLevelList1();

}
  onSubmit(){
    console.log(this.salary);
    this.saveSalary();
  }
}
