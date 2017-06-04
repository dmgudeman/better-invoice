import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';
import { AlwaysAuthGuard }          from '../users/services/guards/always-auth-guard';
import { OnlyLoggedInUsersGuard }   from '../users/services/guards/only-loggedin-users-guard';
import { CompaniesComponent }       from './companies/companies.component';
import { CompanyCardComponent }     from './company-card/company-card.component';
import { CompanyDetailsComponent }  from './company-details/company-details.component';
import { EditCompanyComponent }     from './edit-company/edit-company.component';
import { InputComponent }           from '../shared/input/input.component';

const companyRoutes = [
  { path: 'companies',            
              component: CompaniesComponent, name: 'Companies'}, 
              // canActivate: [OnlyLoggedInUsersGuard, AlwaysAuthGuard] },
  { path: 'company-card/:id',     component: CompanyCardComponent },
  { path: 'app-input',            component: InputComponent },
  { path: 'edit-company',         component: EditCompanyComponent },
  { path: 'edit-company/:id',     component: EditCompanyComponent},
  { path: 'company-details',      component: CompanyDetailsComponent },
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