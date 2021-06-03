import { TokenStorageService } from './../token-storage.service';
import { PositionService } from './../position.service';
import { Position } from './../position';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-create-position',
  templateUrl: './create-position.component.html',
  styleUrls: ['./create-position.component.css']
})
export class CreatePositionComponent implements OnInit {

  position: Position = new Position();
  constructor(private positionService: PositionService,
    private tokenStorage:TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/']);
    }
  }

  savePosition(){
    this.positionService.createPosition(this.position).subscribe( data =>{
      console.log(data);
      this.goTopositionList();
    },
    error => console.log(error));
  }

  goTopositionList(){
    this.router.navigate(['/position']);
  }

  onSubmit(){
    console.log(this.position);
    this.savePosition();
  }
}
