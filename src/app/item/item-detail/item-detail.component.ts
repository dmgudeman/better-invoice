import { Component, 
         OnInit, 
         Input }             from '@angular/core';
import { Router, 
         ActivatedRoute, 
         Params }            from '@angular/router';
import { Company }           from '../../company/company';
import { CompanyService }    from '../../company/company.service';
import { Item }              from '../item';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  @Input() item:Item;
  id
  constructor(
              private _router:Router,
              private _route:ActivatedRoute,
              private _companyService:CompanyService) { }

  ngOnInit() {
    this.id = this.item.id;
  }
  

 
}
