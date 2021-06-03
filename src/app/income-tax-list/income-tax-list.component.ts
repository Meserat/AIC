import { Subject } from 'rxjs';
import { IncomeTax } from './../income-tax';
import { Component, OnInit } from '@angular/core';
import { IncomeTaxService } from '../income-tax.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-income-tax-list',
  templateUrl: './income-tax-list.component.html',
  styleUrls: ['./income-tax-list.component.css']
})
export class IncomeTaxListComponent implements OnInit {





closeResult:String;
title = 'angulardatatables';
  dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject()

// load data
private getIncomeTaxs(){
    this.incomeTaxService.getIncomeTaxList().subscribe(data => {
      this.incomeTaxs = data;
      this.dtTrigger.next();
    });
  }
  popoverTitle = 'Are you sure?';
  popoverMessage = 'Are you really <b>sure</b> you want to do this?';
  confirmText = 'Yes <i class="fas fa-check"></i>';
  cancelText = 'No <i class="fas fa-times"></i>';
  confirmClicked = false;
  cancelClicked = false;

incomeTaxs:IncomeTax[];
   constructor(private incomeTaxService: IncomeTaxService,
    private tokenStorage:TokenStorageService,
    private modalService: NgbModal,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("ACCOUNTANT"))
    {
      this.router.navigate(['/'])
    }
    else{
this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 3,
      processing: true,
    //   dom: 'Bfrtip',
    //     buttons: [
    //         'copy', 'csv', 'excel', 'print'
    //     ]
    //
  };
    this.getIncomeTaxs();
    }

  }


  updateIncomeTax(incomeTaxId: number){

    this.router.navigate(['update-income', incomeTaxId]);
  }
 deleteIncomeTax(incomeTaxId:number){
   alert("are sure to delete")
 this.incomeTaxService.deleteIncomeTax(incomeTaxId).subscribe(data => {
      this.getIncomeTaxs();
 })
  }

// delete Confirmation

open(content: any, incomeTaxId: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteIncomeTax(incomeTaxId);
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
