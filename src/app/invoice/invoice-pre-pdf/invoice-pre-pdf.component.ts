import { Component, OnInit }              from '@angular/core';
import { Location }                       from '@angular/common';

@Component({
  selector: 'app-invoice-pre-pdf',
  templateUrl: './invoice-pre-pdf.component.html',
  styleUrls: ['./invoice-pre-pdf.component.css']
})
export class InvoicePrePdfComponent implements OnInit {
  companyId: number;
  constructor(private _location:Location) { }

  ngOnInit() {


  }


  goBack(): void {
        this._location.back();
    }

}
