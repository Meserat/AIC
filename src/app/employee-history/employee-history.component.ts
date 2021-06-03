import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subject } from 'rxjs';
import { EmployeeHistory } from '../employee-history';
import { EmployeeHistoryService } from '../employee-history.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-employee-history',
  templateUrl: './employee-history.component.html',
  styleUrls: ['./employee-history.component.css']
})
export class EmployeeHistoryComponent implements OnInit {

 title = 'angulardatatables';
 closeResult: string;
  dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject()

 private getEmployeeHistory(){
    this.employeeHistoryService.getEmployeeHistoryList().subscribe(data=>{
      this.employeeHistory=data;
       this.dtTrigger.next();

      data.forEach(item=>{
        this.ehTime.push(item.time);

      });

      for (let index = 0; index < this.ehTime.length; index++) {
        var temp = this.ehTime[index]
        if(temp!=this.ehTime[index+1]){
          this.newTime.push(temp)
        }


      }





    })



     this.dtTrigger.next();



  }

  employeeHistory:EmployeeHistory[];
  date:String;
  ee=[];
  ehTime=[];
  newTime=[];


  constructor(private employeeHistoryService:EmployeeHistoryService,
     private router: Router,
    private tokenStorage:TokenStorageService,
    private modalService: NgbModal) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/'])
    }
    else{

     this.dtTrigger.next();
      this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      processing: true,
      bDestory:true,
      dom: 'Bfrtip',
        buttons: [
          {
            extend:'copy',
            exportOptions:{
               columns:[':visible:not(:last-child-1,:last-child)']

            }
          },
          {
            extend:'csv',
            title:"Artifical Intelligence Centre Employee List",
             messageTop:"Payroll report, "+ new Date(),
             exportOptions:{
         columns:[':visible:not(:last-child)']

            }
          },
          {
            extend:'excel',
            title:"Artifical Intelligence Centre Employee List",
           messageTop:"Employee Information report, "+ new Date(),
            exportOptions:{
             columns:[':visible:not(:last-child)']

            }
          },
            {
            extend:'print',
  title:"Artifical Intelligence Center Employee list",
            messageTop:"Employee Information report, "+ new Date(),
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
             columns:[':visible:not(:last-child-1,:last-child)']

             }
          },
          'colvis',



        ]

    };

       this.getEmployeeHistory();
       this.dtTrigger.next();
         }
  }

  searchByDate(){
    this.ee=[];
  //   this.dtTrigger.next();
     this.ee.push( this.employeeHistory.filter(item => item.time === this.date));
      console.log(this.date);
    //  this.dtTrigger.next();

    console.log(this.ee[0].length);
  }

  reload(){
    this.router.navigate(["/employee-history"]).then(()=>{
        window.location.reload();
       });

   }
}
