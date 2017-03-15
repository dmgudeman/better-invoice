import { NgModule }               from '@angular/core';
import { RouterModule, Routes }   from '@angular/router';
import { InputComponent }         from './shared/input/input.component';
import { InvoiceEditComponent }   from './invoice/invoice-edit/invoice-edit.component';
import { InvoicePrePdfComponent } from './invoice/invoice-pre-pdf/invoice-pre-pdf.component';
import { ItemDetailComponent }    from './item/item-detail/item-detail.component';
import { ItemEditComponent }      from './item/item-edit/item-edit.component';
import { NotFoundComponent }      from './not-found/not-found.component';

export const routes: Routes = [
  { path: '',                     redirectTo: 'companies', pathMatch: 'full'},
  { path: 'item-edit/:id',        component: ItemEditComponent},
  { path: 'item-edit',            component: ItemEditComponent },
  { path: 'app-item-detail',      component: ItemDetailComponent }, 
  { path: 'app-input',            component: InputComponent },
  // { path: 'invoice/:id',       component: InvoiceComponent },
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