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
  street1: string;
  street2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;


  constructor(private _companyService:CompanyService) { }
  
  ngOnInit() {
    this.setAddress(this.coId);
    // console.log(`Address ngOnInit Address ${this.address}`);

  }

   setAddress(coId) { 
         this._companyService
            .getCompany(coId)
            .subscribe(company => {this.company = company;
                   this.address = company.Address;
                   this.street1 = this.address.street1
                   this.street2 = this.address.street2
                   this.city = this.address.city;
                   this.postalCode = this.address.postalCode;
                   this.state = this.address.state;
                   this.country = this.address.country;
                  //  console.log("Address getCompany this.coId ", this.coId);
                  //  console.log("Address getCompany this.company" + JSON.stringify(this.company));
            });
    }
}
