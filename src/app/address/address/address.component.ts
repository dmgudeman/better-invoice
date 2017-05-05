import { 
    Component, 
    OnInit,
    Input 
  }                          from '@angular/core';
import { Address }           from '../address';
import { Company }           from '../../company/company';
import { CompanyService }    from '../../company/company.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.css']
})
export class AddressComponent implements OnInit {
  @Input() coId:number;
  @Input() address:Address;
  company: Company;
  city: string;

  constructor(private _companyService:CompanyService) { }
  
  ngOnInit() {
    this.getCompany(this.coId);
    console.log(`Address ngOnInit Address ${this.address}`);


  }

   getCompany(coId) { 
         this._companyService
            .getCompany(coId)
            .subscribe(company => {this.company = company;
                   this.city = company.Address.city;
                   console.log("Address getCompany this.coId ", this.coId);
                   console.log("Address getCompany this.company" + JSON.stringify(this.company));
            })
    }}
