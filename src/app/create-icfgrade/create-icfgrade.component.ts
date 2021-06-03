import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICFGrade } from '../icfgrade';
import { ICFGradeService } from '../icfgrade.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-create-icfgrade',
  templateUrl: './create-icfgrade.component.html',
  styleUrls: ['./create-icfgrade.component.css']
})
export class CreateIcfgradeComponent implements OnInit {

icfgrade: ICFGrade = new ICFGrade();
  constructor(private icfgradeService: ICFGradeService,
    private tokenStorage:TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {



if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/']);
    }
  }

  saveIcfgrade(){
    this.icfgradeService.createICFGrade(this.icfgrade).subscribe( data =>{
      console.log(data);
      this.goToIcfgradeList();
    },


    error => console.log("Error happened"+error));
  }

  goToIcfgradeList(){
    this.router.navigate(['/icfgrade-list']);
  }

  onSubmit(){
    console.log(this.icfgrade);
    this.saveIcfgrade();
  }



}
