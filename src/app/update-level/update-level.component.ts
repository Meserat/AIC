import { TokenStorageService } from './../token-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Level } from '../level';
import { LevelService } from '../level.service';

@Component({
  selector: 'app-update-level',
  templateUrl: './update-level.component.html',
  styleUrls: ['./update-level.component.css']
})
export class UpdateLevelComponent implements OnInit {

 id: number;
level: Level = new Level();
  constructor(private levelService:LevelService,
    private route: ActivatedRoute,
    private tokenStorage:TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
  if(!this.tokenStorage.isLogedIn("HR")){
    this.router.navigate(['/'])
  }
  else{
 this.id = this.route.snapshot.params['id'];

    this.levelService.getLevelById(this.id).subscribe(data => {
      this.level = data;
    }, error => console.log(error));

  }
   }

  onSubmit(){
    this.levelService.updateLevel(this.id, this.level).subscribe( data =>{
      this.goToLevelList();
    }
    , error => console.log(error));
  }

  goToLevelList(){
    this.router.navigate(['/level']);
  }

}
