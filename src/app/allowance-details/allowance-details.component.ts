import { Allowance } from './../allowance';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AllowanceService } from '../allowance.service';

@Component({
  selector: 'app-allowance-details',
  templateUrl: './allowance-details.component.html',
  styleUrls: ['./allowance-details.component.css']
})
export class AllowanceDetailsComponent implements OnInit {

  allowanceId: number
  allowance: Allowance
  constructor(private route: ActivatedRoute,
    private allowanceService: AllowanceService) { }

  ngOnInit(): void {
    this.allowanceId = this.route.snapshot.params['allowanceId'];

    this.allowance = new Allowance();
    this.allowanceService.getAllowanceById(this.allowanceId).subscribe( data => {
      this.allowance = data;
    });
  }

}
