import { Users } from './../../users';
import {
  Component,
  OnInit,
  HostListener,
  ElementRef,
  ViewChild,
  Renderer2,
} from '@angular/core';
import { UserService } from '../../user.service';
import { TokenStorageService } from 'src/app/token-storage.service';


@Component({
  selector: 'app-messages-dropdown-menu',
  templateUrl: './messages-dropdown-menu.component.html',
  styleUrls: ['./messages-dropdown-menu.component.css'],
})
export class MessagesDropdownMenuComponent implements OnInit {
  count:number=0;

users:Users[];
currentUser=[];
  @ViewChild('dropdownMenu', { static: false }) dropdownMenu;

  @HostListener('document:click', ['$event'])
  clickout(event) {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.hideDropdownMenu();
    }
  }

  constructor(private elementRef: ElementRef, private renderer: Renderer2,
     private tokenStorage:TokenStorageService,
    private userService:UserService,) {}
  private getUsers(){
  this.userService.getUsersList().subscribe(data=>{
    this.users=data;
    this.users.forEach(item=>{
      if(item.userRole.roleName==this.tokenStorage.getUser().roles[0] && item.userUserName != this.tokenStorage.getUser().userUserName){
       this.count=this.count+1;
       this.currentUser.push(item);

      }
    })
  })
}

  ngOnInit() {

    this.getUsers();
  }

  toggleDropdownMenu() {
    if (this.dropdownMenu.nativeElement.classList.contains('show')) {
      this.hideDropdownMenu();
    } else {
      this.showDropdownMenu();
    }
  }

  showDropdownMenu() {
    this.renderer.addClass(this.dropdownMenu.nativeElement, 'show');
  }

  hideDropdownMenu() {
    this.renderer.removeClass(this.dropdownMenu.nativeElement, 'show');
  }
}
