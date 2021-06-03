import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';

@Component({
  selector: 'app-company-list',
  templateUrl: './company-list.component.html',
  styleUrls: ['./company-list.component.css']
})
export class CompanyListComponent implements OnInit {
  companys:Company[]

  constructor(private companyService:CompanyService) { }

  ngOnInit(): void {
       this.getCompanys();

      // this.companys=[{
      //   "companyId":1,
      //    "companyName":"Meserat",
      //    "companyLogo":"Logo",
      // }]
  }

private getCompanys(){
  this.companyService.getCompanyList().subscribe(data=>{
    this.companys=data;
  })
}


}
