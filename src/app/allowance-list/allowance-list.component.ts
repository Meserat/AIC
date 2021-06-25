import { Allowance } from './../allowance';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AllowanceService } from '../allowance.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-allowance-list',
  templateUrl: './allowance-list.component.html',
  styleUrls: ['./allowance-list.component.css']
})
export class AllowanceListComponent implements OnInit {
  closeResult: string;
  dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject()

  allowances:Allowance[]
  popoverTitle = 'Are you sure to delete this?';
  popoverMessage = 'You gonna delete this information';
  confirmClicked = false;
  cancelClicked = false;
  private getAllowances(){
    this.allowanceService.getAllowancesList().subscribe(data => {
      this.allowances = data;
      this.dtTrigger.next();
    });
  }


  constructor(private allowanceService: AllowanceService,
     private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
   this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 12,
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

    this.getAllowances();
  }


   updateAllowance(id: number){
    this.router.navigate(['update-allow', id]);
  }
  // delete Confirmation

open(content: any, allowanceId: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteAllowance(allowanceId);
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


  deleteAllowance(allowanceId:number){
 this.allowanceService.deleteAllowance(allowanceId).subscribe(data => {
      this.getAllowances();
      alert("Deleted Successfully")
 })
  }

}


