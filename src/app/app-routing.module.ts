import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { AddressEditComponent }   from './address/address-edit/address-edit.component';
import { InputComponent }         from './shared/input/input.component';
import { InvoiceEditComponent }   from './invoice/invoice-edit/invoice-edit.component';
import { InvoicePrePdfComponent } from './invoice/invoice-pre-pdf/invoice-pre-pdf.component';
import { ItemDetailComponent }    from './item/item-detail/item-detail.component';
import { ItemDetailOneComponent } from './item/item-detail-one/item-detail-one.component';
import { ItemEditComponent }      from './item/item-edit/item-edit.component';
import { NotFoundComponent }      from './not-found/not-found.component';
import { LoginComponent }         from './users/login/login.component';
import { UserComponent }          from './users/user/user.component';

export const routes: Routes = [
  { path: '',                     redirectTo: 'login', pathMatch: 'full'},
  // { path: 'login', component: LoginComponent },
  // { path: 'companies',            component: CompaniesComponent },
  { path: 'address',              component: AddressEditComponent },
  { path: 'item-edit/:id',        component: ItemEditComponent },
  { path: 'item-edit',            component: ItemEditComponent },
  { path: 'app-item-detail',      component: ItemDetailComponent }, 
  { path: 'item-detail-one',      component: ItemDetailOneComponent }, 
  { path: 'app-input',            component: InputComponent },
  { path: 'invoice-edit',         component: InvoiceEditComponent },
  { path: 'invoice-pre-pdf',      component: InvoicePrePdfComponent },
  { path: 'invoice-pre-pdf/:id',  component: InvoicePrePdfComponent },
    
  { path: 'not-found',            component: NotFoundComponent },
  { path: '**',                   redirectTo: 'not-found' }
];

@NgModule({
   imports: [
    RouterModule.forRoot(routes),
   ],
   exports: [
    RouterModule
   ],
})

export class AppRoutingModule {}