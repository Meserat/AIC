import { Position } from './../position';
import { Component, OnInit } from '@angular/core';
import {PositionService} from '../position.service'
import { Router } from '@angular/router';
import { TokenStorageService } from '../token-storage.service';
import { Subject } from 'rxjs';
@Component({
  selector: 'app-position-list',
  templateUrl: './position-list.component.html',
  styleUrls: ['./position-list.component.css']
})
export class PositionListComponent implements OnInit {

   positions: Position[];
   dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject()


  constructor(private positionService: PositionService,
    private tokenStorage:TokenStorageService,
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

        this.getPositions();
    }

  }

  private getPositions(){
    this.positionService.getPositionList().subscribe(data => {
      this.positions = data;
        this.dtTrigger.next();
    });
  }


  updatePosition(id: number){
    this.router.navigate(['update-position', id]);
  }

  deletePosition(id: number){
    this.positionService.deletePosition(id).subscribe( data => {
      console.log(data);
      this.getPositions();
    })
  }


}
