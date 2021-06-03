import { TokenStorageService } from './../token-storage.service';
import { AllowanceService } from './../allowance.service';
import { Allowance } from './../allowance';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-allowance',
  templateUrl: './update-allowance.component.html',
  styleUrls: ['./update-allowance.component.css']
})
export class UpdateAllowanceComponent implements OnInit {

 id: number;
  allowance: Allowance = new Allowance();
  constructor(private allowanceService: AllowanceService,
    private tokenStorage:TokenStorageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("ACCOUNTANT")){
      this.router.navigate(['/']);
    }
    else{
      this.id = this.route.snapshot.params['id'];

      this.allowanceService.getAllowanceById(this.id).subscribe(data => {
        this.allowance = data;
      }, error => console.log(error));
  }
  }

  onSubmit(){
    this.allowanceService.updateAllowance(this.id,
      this.allowance).subscribe( data =>{
      this.goToAllowanceList();
    }
    , error => console.log(error));
  }

  goToAllowanceList(){
    this.router.navigate(['/allow']);
  }


}
