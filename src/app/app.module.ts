import { NgModule }                 from '@angular/core';
import { BrowserAnimationsModule }  from '@angular/platform-browser/animations';
import { BrowserModule }            from '@angular/platform-browser';
import { FormsModule, 
         ReactiveFormsModule }      from '@angular/forms';
import { FlexLayoutModule }         from '@angular/flex-layout';
import { HttpModule }               from '@angular/http';
import { RouterModule, 
         Routes, 
         RouterOutlet }             from '@angular/router';
import { RouterTestingModule }     from '@angular/router/testing';
import { MaterialModule }           from '@angular/material';
// my modules
import { AppRoutingModule }         from './app-routing.module';
import { CompanyModule }            from './company/company.module';
import { SharedModule }             from 'app/shared/shared.module';
import { UsersModule }              from './users/users.module';
import { UsersRoutingModule }       from './users/users-routing.module';

// 3rd party modules
import 'jquery';
import { MyDatePickerModule }       from 'mydatepicker';
import { MyDateRangePickerModule }  from 'mydaterangepicker';

// components
// import { AddressComponent }         from './address/address/address.component';
// import { AddressEditComponent }     from './address/address-edit/address-edit.component';
import { AppComponent }             from './app.component';
import { InvoiceEditComponent }     from './invoice/invoice-edit/invoice-edit.component';
import { ItemEditComponent }        from './item/item-edit/item-edit.component';
import { ItemDetailOneComponent }   from './item/item-detail-one/item-detail-one.component';
import { NotFoundComponent }        from './not-found/not-found.component';
import { Tab }                      from './shared/tab';
import { Tabs }                     from './shared/tabs';

// services and providers
import { ItemService }              from './item/item.service';
import { HttpClientService }        from './shared/http-client.service';
import { InvoicePrePdfComponent }   from './invoice/invoice-pre-pdf/invoice-pre-pdf.component';
import { InvoiceService }           from './invoice/invoice.service';
import { MyGlobals }                from './shared/myglobals';
import { ItemListComponent }        from './item/item-list/item-list.component';
// import { AddressEditComponent } from './address/address-edit/address-edit.component';

@NgModule({
  declarations: [
    // AddressComponent,  this is company.module
    AppComponent,
    InvoicePrePdfComponent,
    InvoiceEditComponent,
    ItemEditComponent,
    ItemDetailOneComponent,
    NotFoundComponent,
    Tab,
    Tabs,
    ItemListComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    CompanyModule,
    FlexLayoutModule,
    FormsModule,
    HttpModule,
    MaterialModule,
    MyDatePickerModule,
    MyDateRangePickerModule,
    ReactiveFormsModule,
    RouterTestingModule,
    SharedModule,
    UsersModule,
    
    // Routing Modules
    AppRoutingModule,
    UsersRoutingModule,
  ],
  providers: [
    InvoiceService,
    ItemService,
    MyGlobals,
    RouterOutlet
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
