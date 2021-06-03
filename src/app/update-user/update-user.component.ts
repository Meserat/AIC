import { TokenStorageService } from './../token-storage.service';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from './../user.service';
import { Component, OnInit } from '@angular/core';
import { Users } from '../users';

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.css']
})
export class UpdateUserComponent implements OnInit {
  id:number;
   user:Users=new Users()
  constructor(private userService:UserService,
   private route: ActivatedRoute,
   private tokenStorage:TokenStorageService,
    private router: Router) { }

  ngOnInit(): void {
    // if(!this.tokenStorage.isLogedIn("ADMIN")){
    //   this.router.navigate(['/']);
    // }
    // else{
      this.id=this.route.snapshot.params["id"];
      this.userService.getUsersById(this.id).subscribe(data=>{
        this.user=data;
    }
    ,
    error=>console.log(error))
  }
  onSubmit(){
    this.user.status = false;
    console.log(this.user);
    this.userService.updateUser(this.id, this.user).subscribe( data =>{
    console.log(data)
    this.goToUserList();

    }
    , error => console.log(error));
  }

  goToUserList(){
    this.router.navigate(['/admin']);
  }

}

