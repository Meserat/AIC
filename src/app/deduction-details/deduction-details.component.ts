import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Deduction } from '../deduction';
import { DeductionService } from '../deduction.service';
import { TokenStorageService } from '../token-storage.service';

@Component({
  selector: 'app-deduction-details',
  templateUrl: './deduction-details.component.html',
  styleUrls: ['./deduction-details.component.css']
})
export class DeductionDetailsComponent implements OnInit {


  deductionId: number
  deduction: Deduction
  constructor(private route: ActivatedRoute, private deductionService: DeductionService,
    private tokenStorage:TokenStorageService,
    private router:Router
    ) { }

  ngOnInit(): void {
    if(!this.tokenStorage.isLogedIn("ACCOUNTANT")){
      this.router.navigate(['/']);
    }
    else{
  this.deductionId = this.route.snapshot.params['deductionId'];

    this.deduction = new Deduction();
    this.deductionService.getDeductionById(this.deductionId).subscribe( data => {
      this.deduction = data;
    });
    }

  }

}
