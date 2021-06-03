import { Directorate } from './../directorate';
import { Component, OnInit } from '@angular/core';
import { DirectorateService } from '../directorate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-directorate-list',
  templateUrl: './directorate-list.component.html',
  styleUrls: ['./directorate-list.component.css']
})
export class DirectorateListComponent implements OnInit {


  directorates: Directorate[];

  constructor(private directorateService: DirectorateService,
    private router: Router) { }

  ngOnInit(): void {
    this.getDirectorates();
  }

  private getDirectorates(){
    this.directorateService.getDirectoratesList().subscribe(data => {
      this.directorates = data;
    });
  }


  updateDirectorate(id: number){
    this.router.navigate(['update-directorate', id]);
  }

  deleteDirectorate(id: number){
    this.directorateService.deleteDirectorate(id).subscribe( data => {
      console.log(data);
      this.getDirectorates();
    })
  }

}
