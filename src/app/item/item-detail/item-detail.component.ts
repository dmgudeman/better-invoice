import { Component, 
         OnInit, 
         Input }             from '@angular/core';
import { Router, 
         ActivatedRoute, 
         Params }            from '@angular/router';
import { Company }           from '../../company/company';
import { CompanyService }    from '../../company/company.service';
import { Item }              from '../item';
import { ItemService }       from '../item.service';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  @Input() item:Item
   id; date; description; amount; hours;
  constructor(
              private _router:Router,
              private _route:ActivatedRoute,
              private _companyService:CompanyService,
              private _itemService:ItemService ) { }

  ngOnInit() {
      console.log(this.item);
      // console.log(this.item.date);
      // console.log(this.item.description);
      // console.log(this.item.amount);
      // console.log(this.item.hours);
  }
  
getItem(itemId){
  return this._itemService.getItem(itemId)
             .subscribe(item => this.item = item);
}
printItem(){
  console.log(this.item);
}
 
}
