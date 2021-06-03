import { TokenStorageService } from './../token-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Position } from '../position';
import { PositionService } from '../position.service';

@Component({
  selector: 'app-update-position',
  templateUrl: './update-position.component.html',
  styleUrls: ['./update-position.component.css']
})
export class UpdatePositionComponent implements OnInit {

id: number;
position: Position = new Position();
  constructor(private positionService: PositionService,
    private route: ActivatedRoute,
    private tokenStorage:TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/']);
    }
    else{
this.id = this.route.snapshot.params['id'];

    this.positionService.getPositionById(this.id).subscribe(data => {
      this.position = data;
    }, error => console.log(error));

    }
     }

  onSubmit(){
    this.positionService.updatePosition(this.id, this.position).subscribe( data =>{
      this.goToPositionList();
    }
    , error => console.log(error));
  }

  goToPositionList(){
    this.router.navigate(['/position']);
  }


}
