import { Component, OnInit, Input } from '@angular/core';
import { Company } from '../company';
import { CompanyService } from '../company.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Shared } from '../../shared/shared';

@Component({
  selector: 'app-company-card',
  templateUrl: './company-card.component.html',
  styleUrls: ['./company-card.component.css']
})
export class CompanyCardComponent implements OnInit {
  shared:Shared = new Shared();
  coId: number;
  @Input() company:Company;
  name:string;
  color:string;

  constructor(private _companyService: CompanyService,
              private _router: Router,
              private _route: ActivatedRoute,
              
              ) {
              // this.company = compan;
   }

  ngOnInit() {
    
      //  this._route.params
      //      .subscribe(params => { 
      //                             this.coId = +params['id'];
      //                           });
      //  this.getCompany(this.coId);
      this.name = this.company.name;
      this.color = this.company.color;
      
      //  if (this.company){
      //       this.name = this.company.name;
      //       this.color = this.company.color;
      //  } else {
      //       this.name = "Test Company";
      //       this.color = "red";
      //  }
  }
  getCompany(id) {
     return this._companyService
                .getCompany(id)
                .subscribe(
                    company => {this.company = company,
                                this.name = this.company.name;
                                this.color = this.company.color;},
                    response => { if (response.status = 404) {
                                        this._router.navigate(['not-found']);}
                                }
                );
  }
  setClassColor() {
      return this.shared.setClassColor(null, this.color);
  }
}
