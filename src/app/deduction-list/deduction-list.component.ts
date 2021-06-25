import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { Deduction } from '../deduction';
import { DeductionService } from '../deduction.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-deduction-list',
  templateUrl: './deduction-list.component.html',
  styleUrls: ['./deduction-list.component.css']
})
export class DeductionListComponent implements OnInit {
 deductions:Deduction[];
 closeResult: string;
 title = 'angulardatatables';
  dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject()

  popoverTitle = 'Are you sure to delete this?';
  popoverMessage = 'You gonna delete this information';
  confirmClicked = false;
  cancelClicked = false;
  private getDeductions(){
    this.deductionService.getDeductionsList().subscribe(data => {
      this.deductions = data;
       this.dtTrigger.next();
    });
  }
   constructor(private deductionService: DeductionService,private modalService: NgbModal,
    private tokenStorage:TokenStorageService,

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

    this.getDeductions();
    }




  updateDeduction(id: number){
    this.router.navigate(['update-dedu', id]);
  }
 deleteDeduction(deductionId:number){
 this.deductionService.deleteDeduction(deductionId).subscribe(data => {
      this.getDeductions();
 })
  }
  deductionDetails(deductionId: number){
    this.router.navigate(['view-deduction', deductionId]);
  }


// delete Confirmation

open(content: any, deductionId: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteDeduction(deductionId);
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




}
