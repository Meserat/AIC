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
      pageLength: 6,
      processing: true,
      // dom: 'Bfrtip',
      //   buttons: [
      //     {
      //       extend:'copy',
      //       exportOptions:{
      //         columns:[0,1,2,3,4]

      //       }
      //     },
      //     {
      //       extend:'csv',
      //       exportOptions:{
      //         columns:[0,1,2,3,4]

      //       }
      //     },
      //     {
      //       extend:'excel',
      //       exportOptions:{
      //         columns:[0,1,2,3,4]

      //       }
      //     },
      //       {
      //       extend:'print',
      //       exportOptions:{
      //         columns:[0,1,2,3,4]

      //       }
      //     }

      //   ]
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


