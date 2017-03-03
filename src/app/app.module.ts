import { NgModule }             from '@angular/core';
import { BrowserModule }        from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule }     from '@angular/flex-layout';
import { HttpModule }           from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import { MaterialModule }       from '@angular/material';

import { AppRoutingModule }     from './app-routing.module';
import { CompanyRoutingModule } from './company/company-routing.module';
import { MyDatePickerModule }   from 'mydatepicker';
import { MyDateRangePickerModule } from 'mydaterangepicker';
import { CompanyModule }        from './company/company.module';

import { AppComponent } from './app.component';
import { ClientComponent } from './client/client.component';
import { ClientService } from './client.service';
import { InvoiceService } from './invoice/invoice.service';
import { ItemService } from './item/item.service';

// import { HomeComponent } from './home/home.component';

import { Tab } from './shared/tab';
import { Tabs } from './shared/tabs';
import { NewItemComponent } from './item/new-item/new-item.component';
import { ItemComponent } from './item/item/item.component';
import { InvoiceComponent } from './invoice/invoice.component';
import { NotFoundComponent } from './not-found/not-found.component';

@NgModule({
  declarations: [
    Tab,
    Tabs,
    AppComponent,
    ClientComponent,
    // HomeComponent,
    NewItemComponent,
    ItemComponent,
    InvoiceComponent,
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
    CompanyRoutingModule,
    AppRoutingModule,
  ],
  providers: [
    ClientService,
    InvoiceService,
    ItemService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
