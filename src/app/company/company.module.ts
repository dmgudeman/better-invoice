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
import { InputComponent }       from '../shared/input/input.component';
import { TruncatePipe } from '../shared/truncate.pipe';
import { EditCompanyComponent } from './edit-company/edit-company.component';

@NgModule({
  declarations: [
    CompaniesComponent,
    CompanyDetailsComponent,
    InputComponent,
    NewCompanyComponent,
    CompanyCardComponent,
    TruncatePipe,
    EditCompanyComponent,
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
