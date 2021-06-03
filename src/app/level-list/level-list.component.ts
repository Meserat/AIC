import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Level } from '../level';
import {LevelService} from  "../level.service";
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css']
})
export class LevelListComponent implements OnInit {

levels: Level[];

  constructor(private levelService: LevelService,
    private router: Router,
    private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/'])
    }
    else{
  this.getLevels();
    }

  }

  private getLevels(){
    this.levelService.getLevelList().subscribe(data => {
      this.levels = data;
    });
  }


  updateLevel(id: number){
    this.router.navigate(['update-level', id]);
  }

  deleteLevel(id: number){
    this.levelService.deleteLevel(id).subscribe( data => {
      console.log(data);
      this.getLevels();
    })
  }


}
