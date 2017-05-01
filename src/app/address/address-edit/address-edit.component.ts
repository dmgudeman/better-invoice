import { Component,
         Input, 
         OnInit }         from '@angular/core';
import { Company }        from '../../company/company';
import { CompanyService } from '../../company/company.service';

@Component({
  selector: 'app-address-edit',
  templateUrl: './address-edit.component.html',
  styleUrls: ['./address-edit.component.css']
})
export class AddressEditComponent implements OnInit {
  @Input() coId: number;
  company: Company;

  constructor(private _companyService: CompanyService) { }

  ngOnInit() {
    this.getCompany(this.coId);


  }

  getCompany(coId) {
    this._companyService
      .getCompany(coId)
      .subscribe(company => {
      this.company = company;
        console.log("this.coId in address", this.coId);
        console.log("THIS COMPANY in address" + JSON.stringify(this.company));
      })
  }
}
