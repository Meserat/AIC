import { TokenStorageService } from './../token-storage.service';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { UserService } from '../user.service';
import { Users } from '../users';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap'

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
 title = 'angulardatatables';
 closeResult: string;
  dtOptions: any = {};
  dtTrigger:Subject<any>=new Subject()
users:Users[]
private getUsers(){
  this.userService.getUsersList().subscribe(data=>{
    this.users=data;
      this.dtTrigger.next();
  })
}
  constructor( private userService:UserService,
    private tokenStorage:TokenStorageService,
    private router: Router, private modalService: NgbModal) {
  }
  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("ADMIN")){
      this.router.navigate(['/']);
    }
    else{
      this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 6,
      processing: true,
      dom: 'Bfrtip',
        buttons: [
          {
            extend:'copy',
            exportOptions:{
              columns:[0,1,2,3,4]

            }
          },
          {
            extend:'csv',
            exportOptions:{
              columns:[0,1,2,3,4]

            }
          },
          {
            extend:'excel',
            exportOptions:{
              columns:[0,1,2,3,4]

            }
          },
            {
            extend:'print',
            exportOptions:{
              columns:[0,1,2,3,4]

            }
          }

        ]
    };

    this.getUsers();
    this.reload();


    }
  }
 // delete Confirmation

open(content: any, userId: number) {
    this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
      if (result === 'yes') {
        this.deleteUser(userId);
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

updateUser(id:number){
this.router.navigate(["update-user",id])

}
deleteUser(userId:number){
  this.userService.deleteUser(userId).subscribe(data=>{
    console.log(data)
    this.getUsers();
  })

}

reload(){
   this.router.navigate(['/admin'])
  }

}

