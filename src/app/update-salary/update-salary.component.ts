import { ICFGradeService } from './../icfgrade.service';
import { ICFGrade } from './../icfgrade';
import { TokenStorageService } from './../token-storage.service';
import { Salary } from './../salary';
import { Component, Input, OnInit } from '@angular/core';
import { SalaryService } from '../salary.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Level } from '../level';
import { LevelService } from '../level.service';
import { data } from 'jquery';

@Component({
  selector: 'app-update-salary',
  templateUrl: './update-salary.component.html',
  styleUrls: ['./update-salary.component.css']
})
export class UpdateSalaryComponent implements OnInit {

  salary: Salary = new Salary();

  icfGrades: ICFGrade []
  ICfGradeId:number;

  levels: Level[]
  levelId:number;

  salaries:Observable <Salary[]>
  @Input() level:Level;
  @Input() icfGrade:ICFGrade;


 id: number;

  constructor(private salaryService: SalaryService,
    private icfGradeService:ICFGradeService,
    private levelService:LevelService,
    private route: ActivatedRoute,
    private tokenStorage:TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(["/"])
    }
    else {
    this.id = this.route.snapshot.params['id'];

    this.salaryService.getsalaryById(this.id).subscribe(data => {
      this.salary = data;
    }, error => console.log(error));

    }
    this.getICFGradeData();
    this.getLevelData();
  }

  onSubmit(){
    this.salaryService.updateSalary(this.id, this.salary).subscribe( data =>{
      this.goToSalaryList();
    }
    , error => console.log(error));
  }

  goToSalaryList(){
    this.router.navigate(['/salary-list']);
  }

  getICFGradeData(){
 this.icfGradeService.getICFGradeList1().subscribe(data=>{
    this.icfGrades=data;
 });

}

getLevelData(){
  this.levelService.getLevelList1().subscribe(data=>{
    this.levels=data;
  });

}

}
