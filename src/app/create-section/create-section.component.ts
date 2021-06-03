import { TokenStorageService } from './../token-storage.service';
import { Section } from '../section';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SectionService } from '../section.service';

@Component({
  selector: 'app-create-section',
  templateUrl: './create-section.component.html',
  styleUrls: ['./create-section.component.css']
})
export class CreateSectionComponent implements OnInit {

 section: Section = new Section();
  constructor(private sectionService: SectionService,
    private tokenStorage:TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {



if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/']);
    }
  }

  saveSection(){
    this.sectionService.createSection(this.section).subscribe( data =>{
      console.log("Data is ")
      console.log(data);
      this.goToSectionList();
    },
    error => console.log(error));
  }

  goToSectionList(){
    this.router.navigate(['/section']);
  }

  onSubmit(){
    console.log(this.section);
    this.saveSection();
  }

}
