import { TokenStorageService } from './../token-storage.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IncomeTax } from '../income-tax';
import { IncomeTaxService } from '../income-tax.service';

@Component({
  selector: 'app-update-income-tax',
  templateUrl: './update-income-tax.component.html',
  styleUrls: ['./update-income-tax.component.css']
})
export class UpdateIncomeTaxComponent implements OnInit {

  id: number;
  incometax: IncomeTax = new IncomeTax();
  constructor(private incomeTaxService: IncomeTaxService,
    private tokenStorage:TokenStorageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("ACCOUNTANT")){
      this.router.navigate(['/']);
    }
    else{
      this.id = this.route.snapshot.params['id'];

      this.incomeTaxService.getIncomeTaxById(this.id).subscribe(data => {
        this.incometax = data;
      }, error => console.log(error));
    }
  }

  onSubmit(){
    this.incomeTaxService.updateIncomeTax(this.id, this.incometax).subscribe( data =>{
      this.goToIncomeTaxList();
    }
    , error => console.log(error));
  }

  goToIncomeTaxList(){
    this.router.navigate(['/income']);
  }


}
