import { Component, OnInit } from '@angular/core';
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
  company:Company;
  coId: number;
  name:string;
  color:string;
  shared:Shared = new Shared();
  testFlag:boolean;

  constructor(private _companyService: CompanyService,
              private _router: Router,
              private _route: ActivatedRoute,
              ) {
   
      // if(company){this.testFlag= false};
   }

  ngOnInit() {
    this._route.params
                .subscribe(params => { 
                                     
                                      this.coId = +params['id'];
                                       console.log("this.coId in ngOnInit = " + this.coId )
                                    });
       this.getCompany(this.coId);
      console.log( "this.getCompany() "  + this.company   );
       if (this.company){
         this.name = this.company.name;
         this.color = this.company.color;
       } else {
          this.name = "Test Company";
          this.color = "red";
       }
  }
  getCompany(id) {
     return this._companyService
                      .getCompany(id)
                      .subscribe(
                          company => {this.company = company,
console.log("this.company in getCompany(id) in coCard = " + this.company.name)
                          this.name = this.company.name;
                          this.color = this.company.color;
}),
                          response => {
                            if(response.status = 404) {
                              this._router.navigate(['not-found']);
                            }
                          }
                      ;
  } 
  setClassColor() {
    return this.shared.setClassColor(null, this.color);
  }
}
