import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICFGrade } from '../icfgrade';
import { ICFGradeService } from '../icfgrade.service';
import { TokenStorageService } from '../token-storage.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { Subject } from 'rxjs';

@Component({
  selector: 'app-icfgrade-list',
  templateUrl: './icfgrade-list.component.html',
  styleUrls: ['./icfgrade-list.component.css']
})
export class IcfgradeListComponent implements OnInit {
icfgrades: ICFGrade[];
closeResult: string;
 dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject()

  constructor(private icfgradeService: ICFGradeService,
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
          this.getIcfGrades();
    }
  }

  private getIcfGrades(){
    this.icfgradeService.getICFGradeList().subscribe(data => {
      this.icfgrades = data;
      console.log(this.icfgrades)
      this.dtTrigger.next();
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
