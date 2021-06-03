import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICFGrade } from '../icfgrade';
import { ICFGradeService } from '../icfgrade.service';
import { TokenStorageService } from '../token-storage.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-icfgrade-list',
  templateUrl: './icfgrade-list.component.html',
  styleUrls: ['./icfgrade-list.component.css']
})
export class IcfgradeListComponent implements OnInit {
icfgrades: ICFGrade[];
closeResult: string;

  constructor(private icfgradeService: ICFGradeService,
    private tokenStorage:TokenStorageService,
     private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/']);
    }
    else{
          this.getIcfGrades();
    }
  }

  private getIcfGrades(){
    this.icfgradeService.getICFGradeList().subscribe(data => {
      this.icfgrades = data;
      console.log(this.icfgrades)
    });
  }


  updateIcfgrade(id: number){
    this.router.navigate(['update-icfgrade', id]);
  }

// delete Confirmation

open(content: any, id: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteIcfgrade(id);
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



  deleteIcfgrade(id: number){
    this.icfgradeService.deleteICFGrade(id).subscribe( data => {
      console.log(data);
      this.getIcfGrades();
    })
  }


}
