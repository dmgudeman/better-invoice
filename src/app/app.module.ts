import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule }         from '@angular/flex-layout';
import { HttpModule }               from '@angular/http';
import { RouterModule, Routes }     from '@angular/router';
import { MaterialModule }           from '@angular/material';

import { CompanyRoutingModule }     from './company/company-routing.module';
import { AppRoutingModule }         from './app-routing.module';
import { MyDatePickerModule }       from 'mydatepicker';
import { MyDateRangePickerModule }  from 'mydaterangepicker';
import { SharedModule }             from 'app/shared/shared.module';
import { CompanyModule }            from './company/company.module';

import { AppComponent }             from './app.component';
import { ItemService }              from './item/item.service';
import { ItemComponent }            from './item/item/item.component';
import { InvoiceComponent }         from './invoice/invoice.component';
import { InvoiceService }           from './invoice/invoice.service';
import { NewItemComponent }         from './item/new-item/new-item.component';
import { NotFoundComponent }        from './not-found/not-found.component';
import { Tab }                      from './shared/tab';
import { Tabs }                     from './shared/tabs';


@NgModule({
  declarations: [
    Tab,
    Tabs,
    AppComponent,
    InvoiceComponent,
    ItemComponent,
    NewItemComponent,
    NotFoundComponent,
  
  ],
  imports: [
    BrowserModule,
    CompanyModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    MyDatePickerModule,
    MyDateRangePickerModule,
    ReactiveFormsModule,
    SharedModule,
    
    CompanyRoutingModule,
    AppRoutingModule,
  ],
  providers: [
    InvoiceService,
    ItemService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
