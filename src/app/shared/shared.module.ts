import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';
// import { FlexLayoutModule }     from '@angular/flex-layout';
// import { HttpModule } from '@angular/http';
// import { RouterModule, Routes } from '@angular/router';
// import { MaterialModule } from '@angular/material';
import { InputComponent }          from 'app/shared/input/input.component';
import { ItemDetailComponent }     from 'app/item/item-detail/item-detail.component';
import { TruncatePipe }            from 'app/shared/truncate.pipe';

@NgModule({
  declarations: [
    InputComponent,
    ItemDetailComponent,
    TruncatePipe,
  ],
  imports: [
    CommonModule,
//     FormsModule,
//     FlexLayoutModule,
//     ReactiveFormsModule,
//     HttpModule,
//     MaterialModule,
//     RouterModule
  ],
  exports: [
       ItemDetailComponent    
  ],
  providers: [
  ]
})
export class SharedModule {} 