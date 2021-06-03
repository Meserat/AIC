import { Salary } from './../salary';
import { Component, OnInit } from '@angular/core';
import { SalaryService } from '../salary.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-salary-list',
  templateUrl: './salary-list.component.html',
  styleUrls: ['./salary-list.component.css']
})
export class SalaryListComponent implements OnInit {


title = 'angulardatatables';
 closeResult: string;
  dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject()
   salaries: Salary[];

  private getSalary(){
      this.salaryService.getSalaryList().subscribe(data => {
        this.salaries = data;
        this.dtTrigger.next();

      });


  }



  constructor(private salaryService: SalaryService,
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
      pageLength: 15,
      processing: true,
      bDestory:true,
      dom: 'Bfrtip',
        buttons: [
          {
            extend:'copy',
            exportOptions:{
               columns:[':visible:not(:last-child)']

            }
          },
          {
            extend:'csv',
            title:"Artifical Intelligence Centre",
             messageTop:"Payroll report, "+ new Date(),
            messageBottom:"Approved by",
            exportOptions:{
         columns:[':visible:not(:last-child)']

            }
          },
          {
            extend:'excel',
            title:"Artifical Intelligence Centre",
            messageTop:"Payroll report, "+ new Date(),
            messageBottom:"Approved by :",
            exportOptions:{
             columns:[':visible:not(:last-child)']

            }
          },
            {
            extend:'print',
  title:"Artifical Intelligence Centre",
            messageTop:"Payroll report, "+ new Date(),
            messageBottom:"Approved by:",
            footer:true,
             orientation: 'landscape',

            customize:function(doc){
              doc.content.splice(1,0,{
                margin:[0,0,0,12],
                alignment:'center',
                image:"data:image/png; base64"
              })
             },


           exportOptions:{
             columns:[':visible:not(:last-child)']

             }
          },
          'colvis',



        ]

    };   this.getSalary();

    }

  }


  salaryDetails(id: number){
    this.router.navigate(['salary-details', id]);
  }

  updateSalary(id: number){
    this.router.navigate(['update-salary', id]);
  }

// delete Confirmation

open(content: any, employeeId: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteSalary(employeeId);
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




deleteSalary(id:number){

    this.salaryService.deleteSalary(id).subscribe( data => {
      console.log(data);
      this.getSalary();
    })
  }
}



