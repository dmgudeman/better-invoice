import { 
    Component, 
    OnInit,
    Input 
  }                          from '@angular/core';
import { Company }           from '../../company/company';
import { CompanyService }    from '../../company/company.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  @Input() coId:number;
  company: Company;

  constructor(private _companyService:CompanyService) { }
  
  ngOnInit() {
    this.getCompany(this.coId);


  }

   getCompany(coId) { 
         this._companyService
            .getCompany(coId)
            .subscribe(company => {this.company = company;
                   console.log("this.coId in address", this.coId);
                   console.log("THIS COMPANY in address" + JSON.stringify(this.company));
            })
    }}
