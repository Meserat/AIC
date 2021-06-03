import { SectionService } from './../section.service';
import { Directorate } from './../directorate';
import { Component, OnInit } from '@angular/core';
import { DirectorateService } from '../directorate.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Section } from '../section';

@Component({
  selector: 'app-update-directorate',
  templateUrl: './update-directorate.component.html',
  styleUrls: ['./update-directorate.component.css']
})
export class UpdateDirectorateComponent implements OnInit {

  id: number;
  directorate: Directorate = new Directorate();
   sections:Section[];
  constructor(private directorateService: DirectorateService,
    private route: ActivatedRoute,
    private sectionService:SectionService,
    private router: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.directorateService.getDirectorateById(this.id).subscribe(data => {
      this.directorate = data;
    }, error => console.log(error));
     this.sectionService.getSectionList().subscribe(data=>{
      this.sections=data;
      console.log(this.sections);
    })
  }

  onSubmit(){
    this.directorateService.updateDirectorate(this.id, this.directorate).subscribe( data =>{
      this.goToDirectorateList();
    }
    , error => console.log(error));
  }

  goToDirectorateList(){
    this.router.navigate(['/directorate-list']);
  }
}
