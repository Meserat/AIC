import { Router } from '@angular/router';
import { UserService } from './../user.service';
import { Users } from './../users';
import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Role } from '../role';
import { RoleService } from '../role.service';
import { HttpClient } from '@angular/common/http';
import { TokenStorageService } from '../token-storage.service';


@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {
  roles:Observable<Role[]>;
  roleId:number;
  @Input() role:Role;
  users:Users=new Users();
  roleName:String;
  constructor(private userService: UserService,
    private roleService:RoleService,
     private tokenStorage:TokenStorageService,
    private http:HttpClient, private router:Router) { }

saveUser(){
  this.userService.createUser(this.users).subscribe(data=>{
    console.log(this.users)
     this.gotoEmployeelist();
  },
 error=> console.log(error)
  )


}
gotoEmployeelist(){
  this.router.navigate(["/admin"])
}
reloadData(){
  this.roles=this.roleService.getRoleList();
}
ngOnInit(): void {
  if(!this.tokenStorage.isLogedIn("ADMIN")){
    this.router.navigate(['/'])
  }
  else{
this.reloadData();
  }

  }
onSubmit(){
  console.log(this.users)


  this.saveUser();
}
}
