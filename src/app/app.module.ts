import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule } from '@angular/material';
import { AppRoutingModule } from './app-routing.module';
import { MyDatePickerModule } from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';



import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { ClientService } from './client.service';
import { CompanyService } from './company/company.service';
import { InvoiceService } from './invoice/invoice.service';
import { ItemService } from './item/item.service';

import { HomeComponent } from './home/home.component';
import { CompaniesComponent } from './company/companies/companies.component';
import { CompanysComponent } from './company/companys/companys.component';

import { Tab } from './shared/tab';
import { Tabs } from './shared/tabs';
import { NewItemComponent } from './item/new-item/new-item.component';
import { ItemComponent } from './item/item/item.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CompanyDetailsComponent } from './company/company-details/company-details.component';
import { NewCompanyComponent } from './company/new-company/new-company.component';
import { TruncatePipe } from './shared/truncate.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { CompanyCardComponent } from './company/company-card/company-card.component';



@NgModule({
  declarations: [
    Tab,
    Tabs,
    AppComponent,
    ClientComponent,
    HomeComponent,
    CompaniesComponent,
    CompanysComponent,
    NewItemComponent,
    ItemComponent,
    InvoiceComponent,
    CompanyDetailsComponent,
    NewCompanyComponent,
    TruncatePipe,
    NotFoundComponent,
    CompanyCardComponent,
        
    
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FlexLayoutModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    // TabsModule.forRoot(),
    MyDatePickerModule,
    MyDateRangePickerModule,
    MaterialModule,


  ],
  providers: [
    ClientService,
    CompanyService,
    InvoiceService,
    ItemService,
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
