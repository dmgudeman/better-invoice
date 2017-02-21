import { Component, OnInit } from '@angular/core';
import { CompanyService } from 'app/company/company.service';
import { Company } from '../company';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { ReactiveFormsModule, FormGroup, FormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-new-company',
  templateUrl: './new-company.component.html',
  styleUrls: ['./new-company.component.css']
})
export class NewCompanyComponent implements OnInit {
  private newCompany:Company;
  private errorMessage: string;
  private businessName;
  private hourlyPay;
  private paymentTerms;
  private active;
  myform : FormGroup;

  constructor(
           private _companyService: CompanyService,
           private _router:Router) { }

  ngOnInit() {
      this.myform = new FormGroup({
        businessName: new FormControl(),
        colorTags: new FormGroup ({
           brownTag: new FormControl(),
           blueTag: new FormControl(),
           redTag: new FormControl(),
           greenTag: new FormControl(),
           yellowTag: new FormControl(),
           purpleTag: new FormControl(),
        }),
        hourlyPay: new FormControl(),
        paymentTerms: new FormControl(),
        active: new FormControl(),
      })
  }
   
  addCompany(company){ 
    console.log( this.businessName +" " + this.hourlyPay + " " +this.paymentTerms +" " +this.active );

   this._companyService.addCompany(company)

       .subscribe( (data) => 
           console.log(data),
          //  {this._companyService.getCompanies(); 
          //    return true},
           error=> { console.error("Error saving company!");
                     return Observable.throw(error);}
      );
  }
}
// save(){
//         var result;
        
//         if (this.company.id) 
        
//             result = this._companyService.updateCompany(this.company);
//         else
//             result = this._companyService.addCompany(this.company)
            
// 		result.subscribe(x => {
//             // Ideally, here we'd want:
//             // this.form.markAsPristine();
//             this._router.navigate(['companies']);
//         });
// 	}
   
// }
//From userForm

//From user.service
//  addUser(user){
// 		return this._http.post(this._url, JSON.stringify(user))
// 			.map(res => res.json());
// 	}
    
//     updateUser(user){
// 		return this._http.put(this.getUserUrl(user.id), JSON.stringify(user))
// 			.map(res => res.json());
// 	}