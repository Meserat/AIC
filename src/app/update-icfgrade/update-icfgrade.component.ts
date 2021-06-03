import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ICFGrade } from '../icfgrade';
import { ICFGradeService } from '../icfgrade.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-update-icfgrade',
  templateUrl: './update-icfgrade.component.html',
  styleUrls: ['./update-icfgrade.component.css']
})
export class UpdateIcfgradeComponent implements OnInit {

id: number;
  icfgrade: ICFGrade = new ICFGrade();
  constructor(private icfgradeService: ICFGradeService,
    private route: ActivatedRoute,
    private tokenStorage:TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/'])
    }
    else{
this.id = this.route.snapshot.params['id'];

    this.icfgradeService.getICFGradeById(this.id).subscribe(data => {
      this.icfgrade= data;
    }, error => console.log(error));

  }
     }

  onSubmit(){
    this.icfgradeService.updateICFGrade(this.id, this.icfgrade).subscribe( data =>{
      console.log(this.icfgrade)
      this.goToIcfGradeList();
    }
    , error => console.log(error));
  }

  goToIcfGradeList(){
    this.router.navigate(['/icfgrade-list']);
  }



}
