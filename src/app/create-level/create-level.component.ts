import { TokenStorageService } from './../token-storage.service';
import { LevelService } from './../level.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Level } from '../level';


@Component({
  selector: 'app-create-level',
  templateUrl: './create-level.component.html',
  styleUrls: ['./create-level.component.css']
})
export class CreateLevelComponent implements OnInit {

level: Level = new Level();
  constructor(private levelService: LevelService,
    private tokenStorage:TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/']);
    }
  }

  saveLevel(){
    this.levelService.createLevel(this.level).subscribe( data =>{
      console.log(data);
      this.goToLevelList();
    },
    error => console.log(error));
  }

  goToLevelList(){
    this.router.navigate(['/level']);
  }

  onSubmit(){
    console.log(this.level);
    this.saveLevel();
  }

}
