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
import { Shared }            from '../../shared/shared';

@Component({
  selector: 'app-item-detail',
  templateUrl: './item-detail.component.html',
  styleUrls: ['./item-detail.component.css']
})
export class ItemDetailComponent implements OnInit {
  @Input() item:Item
  @Input() color:string;
  shared = new Shared();
  constructor(
              private _router:Router,
              private _route:ActivatedRoute,
              private _companyService:CompanyService,
              private _itemService:ItemService ) { }

  ngOnInit() {
      let date;
      console.log("this.color " + this.color);
      console.log("ITEMDETAIL ngInit this.item.date " + this.item.date)
      date = this.shared.setDate(this.item.date);
      console.log("DATE AFTER SETDATE " + date);
  } 
// getItem(itemId){
//   return this._itemService.getItem(itemId)
//              .subscribe(item => this.item = item);
// }
goToEditItem( item?: Item) {
    let id = item.id;
    this._router.navigate(['/new-item/' + id, {id:id} ]);
  }

setColor(color){
    return color;
}
 
}
