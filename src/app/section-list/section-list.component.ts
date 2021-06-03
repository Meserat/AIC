import { TokenStorageService } from './../token-storage.service';
import { Section } from '../section';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SectionService } from '../section.service'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'



@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

 sections: Section[];
 closeResult: string;

  constructor(private sectionService: SectionService,
    private tokenStorage:TokenStorageService,
      private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/']);
    }
    else{
          this.getSections();
    }
  }

  private getSections(){
    this.sectionService.getSectionList().subscribe(data => {
      this.sections = data;
    });
  }


  updateSection(id: number){
    this.router.navigate(['update-section', id]);
  }


  // delete Confirmation

open(content: any, id: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteSection(id);
      }
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }


  deleteSection(id: number){
    this.sectionService.deleteSection(id).subscribe( data => {
      console.log(data);
      this.getSections();
    })
  }

}
