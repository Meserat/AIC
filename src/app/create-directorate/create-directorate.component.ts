import { SectionService } from './../section.service';
import { Section } from './../section';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Directorate } from '../directorate';
import  {DirectorateService} from "../directorate.service"
@Component({
  selector: 'app-create-directorate',
  templateUrl: './create-directorate.component.html',
  styleUrls: ['./create-directorate.component.css']
})
export class CreateDirectorateComponent implements OnInit {

 sections:Section[];
 directorate: Directorate = new Directorate();
  constructor(private directorateService: DirectorateService,

    private sectionService:SectionService,
    private router: Router) { }

  ngOnInit(): void {
    this.sectionService.getSectionList().subscribe(data=>{
      this.sections=data;
      console.log(this.sections);
    })
  }

  saveDirectorate(){
    this.directorateService.createDirectorate(this.directorate).subscribe( data =>{
      console.log(data);
      this.goToDirectorateList();
    },
    error => console.log(error));
  }

  goToDirectorateList(){
    this.router.navigate(['/directorate-list']);
  }

  onSubmit(){
    console.log(this.directorate);
    this.saveDirectorate();
  }

}
