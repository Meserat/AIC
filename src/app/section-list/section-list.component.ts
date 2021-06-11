import { TokenStorageService } from './../token-storage.service';
import { Section } from '../section';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SectionService } from '../section.service'
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Subject } from 'rxjs';



@Component({
  selector: 'app-section-list',
  templateUrl: './section-list.component.html',
  styleUrls: ['./section-list.component.css']
})
export class SectionListComponent implements OnInit {

 sections: Section[];
 closeResult: string;
    dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject()

  constructor(private sectionService: SectionService,
    private tokenStorage:TokenStorageService,
      private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/']);
    }
    else{
      this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 4,
      processing: true,
      bDestory:true,
      dom: 'lBfrtip',


        buttons: [


          {
            extend:'csv',
             charset: 'utf-8',
            bom: true,
            title:"Artifical Intelligence Centre Employee List",
        messageTop:"Payroll report, "+ new Date(),
        exportOptions: {
           columns:[':visible:not(:last-child)']
                }
          },
          {
            extend:'excel',
             charset: 'utf-8',
            bom: true,
            title:"Artifical Intelligence Centre Employee List",
            messageTop:"Employee Information report, "+ new Date(),
            exportOptions: {
                  columns:[':visible:not(:last-child)']
                }
          },
            {
            extend:'print',
            charset: 'utf-8',
            bom: true,

            title:"Artifical Intelligence Center Employee list",
            messageTop:"Employee Information report, "+ new Date(),

            exportOptions: {
               columns:[':visible:not(:last-child)']
                }
          },

               'colvis',
               [ 'colvisRestore' ]
        ]


    };
          this.getSections();
    }
  }

  private getSections(){
    this.sectionService.getSectionList().subscribe(data => {
      this.sections = data;
       this.dtTrigger.next();
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
