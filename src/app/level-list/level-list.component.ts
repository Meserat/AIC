import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Level } from '../level';
import {LevelService} from  "../level.service";
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-level-list',
  templateUrl: './level-list.component.html',
  styleUrls: ['./level-list.component.css']
})
export class LevelListComponent implements OnInit {

levels: Level[];
dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject()

  constructor(private levelService: LevelService,
    private router: Router,
    private tokenStorage:TokenStorageService) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("HR")){
      this.router.navigate(['/'])
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




           exportOptions:{
             columns:[':visible:not(:last-child)']

             }
          },
          'colvis',



        ]

    };
  this.getLevels();
    }

  }

  private getLevels(){
    this.levelService.getLevelList().subscribe(data => {
      this.levels = data;
      this.dtTrigger.next()
    });
  }


  updateLevel(id: number){
    this.router.navigate(['update-level', id]);
  }

  deleteLevel(id: number){
    this.levelService.deleteLevel(id).subscribe( data => {
      console.log(data);
      this.getLevels();
    })
  }


}
