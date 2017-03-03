import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule }     from '@angular/flex-layout';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';

import { CompaniesComponent } from './companies/companies.component';
import { CompanyDetailsComponent } from './company-details/company-details.component';
import { NewCompanyComponent } from './new-company/new-company.component';
import { CompanyCardComponent } from './company-card/company-card.component';
import { CompanyService } from './company.service';
import { TruncatePipe } from '../shared/truncate.pipe';

@NgModule({
  declarations: [
    CompaniesComponent,
    CompanyDetailsComponent,
    NewCompanyComponent,
    CompanyCardComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    RouterModule
  ],
  providers: [
    CompanyService,
  ]
})
export class CompanyModule { }
