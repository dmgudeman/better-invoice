
import { RouterModule, Routes }  from '@angular/router';
import { NgModule }                 from '@angular/core';
import { CompaniesComponent }       from './companies/companies.component';
import { CompanyCardComponent }     from './company-card/company-card.component';
import { CompanyDetailsComponent }  from './company-details/company-details.component';
import { NewCompanyComponent }      from './new-company/new-company.component';
// import { HomeComponent }            from '../home/home.component';

const companyRoutes = [
  { path: '', redirectTo: 'companies', pathMatch: 'full'},
  { path: 'companies', component: CompaniesComponent },
  { path: 'company-card/:id', component: CompanyCardComponent },
  { path: 'new-company', component:NewCompanyComponent },
  { path: 'new-company/:id', component:NewCompanyComponent},
  { path: 'company-details', component:CompanyDetailsComponent },
  // { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  imports:[
    RouterModule.forChild(companyRoutes)
  ],
  exports:[
    RouterModule
  ]
})
export class CompanyRoutingModule{}