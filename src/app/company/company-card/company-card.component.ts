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
  testFlag:boolean;

  constructor() {
   
      // this.company = company;
      // if(company){this.testFlag= false};
   }

  ngOnInit() {
      // this.name= this.company.name;
      // this.color = this.company.color;
      // if(this.testFlag){
          this.name = "Test Company";
          this.color = "green";
      // } else {
      //     this.name = this.company.name;
      //     this.color = this.company.color;
      // }
  }
  setClassColor() {
    return this.shared.setClassColor(null, this.color);
  }
}
