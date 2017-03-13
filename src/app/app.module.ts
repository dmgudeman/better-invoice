import { NgModule }                 from '@angular/core';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule, 
         ReactiveFormsModule }      from '@angular/forms';
import { FlexLayoutModule }         from '@angular/flex-layout';
import { HttpModule }               from '@angular/http';
import { RouterModule, Routes }     from '@angular/router';
import { MaterialModule }           from '@angular/material';

// my modules
import { AppRoutingModule }         from './app-routing.module';
import { CompanyRoutingModule }     from './company/company-routing.module';
import { CompanyModule }            from './company/company.module';
import { SharedModule }             from 'app/shared/shared.module';

// 3rd party modules
import { MyDatePickerModule }       from 'mydatepicker';
import { MyDateRangePickerModule }  from 'mydaterangepicker';

// components
import { AppComponent }             from './app.component';
import { ItemComponent }            from './item/item/item.component';
import { InvoiceComponent }         from './invoice/invoice.component';
import { NewItemComponent }         from './item/new-item/new-item.component';
import { NotFoundComponent }        from './not-found/not-found.component';
import { Tab }                      from './shared/tab';
import { Tabs }                     from './shared/tabs';

// services and providers
import { ItemService }              from './item/item.service';
import { InvoiceService }           from './invoice/invoice.service';
import { MyGlobals }                from './shared/myglobals';

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
    MyGlobals
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
