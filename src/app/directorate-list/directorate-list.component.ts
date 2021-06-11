import { Directorate } from './../directorate';
import { Component, OnInit } from '@angular/core';
import { DirectorateService } from '../directorate.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-directorate-list',
  templateUrl: './directorate-list.component.html',
  styleUrls: ['./directorate-list.component.css']
})
export class DirectorateListComponent implements OnInit {
 dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject()

  directorates: Directorate[];

  constructor(private directorateService: DirectorateService,
    private router: Router) { }

  ngOnInit(): void {
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
    this.getDirectorates();
  }

  private getDirectorates(){
    this.directorateService.getDirectoratesList().subscribe(data => {
      this.directorates = data;
      this.dtTrigger.next();
    });
  }


  updateDirectorate(id: number){
    this.router.navigate(['update-directorate', id]);
  }

  deleteDirectorate(id: number){
    this.directorateService.deleteDirectorate(id).subscribe( data => {
      console.log(data);
      this.getDirectorates();
    })
  }

}
