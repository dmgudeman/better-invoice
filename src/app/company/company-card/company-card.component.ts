import { Component, OnInit } from '@angular/core';
import { Company } from '../company';
import { Shared } from '../../shared/shared';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css']
})
export class CompanyCardComponent implements OnInit {
  company:Company;
  name:string;
  color:string;
  shared:Shared = new Shared();

  constructor(company) {
    this.company = company;

   }

  ngOnInit() {
      this.name= this.company.name;
      this.color = this.company.color;
  }
  setClassColor(company:Company) {
    return this.shared.setClassColor(company);
  }
}
