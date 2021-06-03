import { TokenStorageService } from './../token-storage.service';
import { DeductionService } from '../deduction.service';
import { Deduction } from './../deduction';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update-deduction',
  templateUrl: './update-deduction.component.html',
  styleUrls: ['./update-deduction.component.css']
})
export class UpdateDeductionComponent implements OnInit {
 id: number;
  deduction: Deduction = new Deduction();
  constructor(private deductionService: DeductionService,
    private tokenStorage:TokenStorageService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
     if(!this.tokenStorage.isLogedIn("ACCOUNTANT")){
      this.router.navigate(['/']);
    }
    else{
      this.id = this.route.snapshot.params['id'];

      this.deductionService.getDeductionById(this.id).subscribe(data => {
        this.deduction = data;
      }, error => console.log(error));
    }
  }

  onSubmit(){
    this.deductionService.updateDeduction(this.id,
      this.deduction).subscribe( data =>{
      this.goToAllowanceList();
      alert("Updated SuccessFully")
    }
    , error => console.log(error));
  }


  goToAllowanceList(){
    this.router.navigate(['/dedu']);
  }
}
