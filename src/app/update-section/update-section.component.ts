import { TokenStorageService } from './../token-storage.service';
import { Section } from '../section';
import { Component, OnInit } from '@angular/core';
import { SectionService } from '../section.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-section',
  templateUrl: './update-section.component.html',
  styleUrls: ['./update-section.component.css']
})
export class UpdateSectionComponent implements OnInit {

id: number;
  section: Section = new Section();
  constructor(private sectionService: SectionService,
    private route: ActivatedRoute,
    private tokenStorage:TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/'])
    }
    else{
this.id = this.route.snapshot.params['id'];

    this.sectionService.getSectionById(this.id).subscribe(data => {
      this.section = data;
    }, error => console.log(error));

  }
     }

  onSubmit(){
    this.sectionService.updateSection(this.id, this.section).subscribe( data =>{
      this.goToSectionList();
    }
    , error => console.log(error));
  }

  goToSectionList(){
    this.router.navigate(['/section']);
  }

}
