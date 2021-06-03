import { TokenStorageService } from './token-storage.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'maloo';
  role:String;
  // window.location.reload();
  constructor(private tokenStorage:TokenStorageService, public translate: TranslateService){
    translate.addLangs(['en', 'am']);
    if(window.localStorage.getItem('language')){
       translate.setDefaultLang(window.localStorage.getItem('language'));
    }
    else{
       translate.setDefaultLang('en');
    }

  }
  ngOnInit(): void {
    this.role = this.tokenStorage.getUser().roles;
      console.log(this.role);

}
switchLang(lang: string) {
  window.localStorage.removeItem('language');
  window.localStorage.setItem('language',lang)
  this.translate.use(window.localStorage.getItem('language'));
}

}
