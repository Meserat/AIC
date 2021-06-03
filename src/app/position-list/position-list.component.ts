import { Position } from './../position';
import { Component, OnInit } from '@angular/core';
import {PositionService} from '../position.service'
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';
@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {

   positions: Position[];

  constructor(private positionService: PositionService,
    private tokenStorage:TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/']);
    }
    else{
        this.getPositions();
    }

  }

  private getPositions(){
    this.positionService.getPositionList().subscribe(data => {
      this.positions = data;
    });
  }


  updatePosition(id: number){
    this.router.navigate(['update-position', id]);
  }

  deletePosition(id: number){
    this.positionService.deletePosition(id).subscribe( data => {
      console.log(data);
      this.getPositions();
    })
  }


}
