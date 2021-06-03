import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-appmenu',
  templateUrl: './appmenu.component.html',
  styleUrls: ['./appmenu.component.css']
})
export class AppmenuComponent implements OnInit {
  role:String;



  constructor( private tokenStorage:TokenStorageService,

    private router:Router) {


  }
  ngOnInit(): void {
    this.role = this.tokenStorage.getUser().roles[0];
      console.log(this.role);
      this.reload();

}

reload(){
//  this.router.navigate(['/appmenu'])
}



}
