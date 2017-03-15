import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InputComponent }       from './shared/input/input.component';
import { NewItemComponent }     from './item/new-item/new-item.component';
import { ItemComponent }        from './item/item/item.component';
import { ItemDetailComponent }  from './item/item-detail/item-detail.component';
import { InvoiceComponent }     from './invoice/invoice.component';
import { NotFoundComponent }    from './not-found/not-found.component';

export const routes: Routes = [
  { path: '',                 redirectTo: 'companies', pathMatch: 'full'},
  { path: 'new-item/:id',     component: NewItemComponent},
  { path: 'new-item',         component: NewItemComponent },
  { path: 'app-item-detail',  component: ItemDetailComponent }, 
  { path: 'app-input',        component: InputComponent },
  // { path: 'invoice/:id',      component: InvoiceComponent },
  { path: 'invoice',          component: InvoiceComponent },
  { path: 'not-found',        component: NotFoundComponent },
  { path: '**',               redirectTo: 'not-found' }
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