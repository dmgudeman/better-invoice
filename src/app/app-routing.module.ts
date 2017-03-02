import { NgModule }              from '@angular/core';
import { RouterModule, Routes }  from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CompaniesComponent } from './company/companies/companies.component';
import { CompanyCardComponent } from './company/company-card/company-card.component';
import { CompanyDetailsComponent } from './company/company-details/company-details.component';
import { NewCompanyComponent } from './company/new-company/new-company.component';
import { NewItemComponent } from './item/new-item/new-item.component';
import { ItemComponent } from './item/item/item.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { NotFoundComponent } from './not-found/not-found.component';



const appRoutes: Routes = [
  { path: '', redirectTo: '/home-app', pathMatch: 'full'},
  { path: 'home-app', component: HomeComponent },
  { path: 'companies', component: CompaniesComponent },
  { path: 'company-card/:id', component: CompanyCardComponent },
  { path: 'new-item/:id', component: NewItemComponent},
  { path: 'new-item', component: NewItemComponent },
  { path: 'invoice/:id', component: InvoiceComponent },
  { path: 'invoice', component: InvoiceComponent },
  { path: 'new-company', component:NewCompanyComponent },
  { path: 'new-company/:id', component:NewCompanyComponent},
  { path: 'company-details', component:CompanyDetailsComponent },
  { path: 'not-found', component: NotFoundComponent },
  { path: '**', redirectTo: 'not-found' }
];


@NgModule({
   imports: [
    RouterModule.forRoot(appRoutes)
   ],
   exports: [
    RouterModule
   ],
})

export class AppRoutingModule {}