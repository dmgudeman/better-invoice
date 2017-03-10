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
  @Input() color:string;
  constructor(
              private _router:Router,
              private _route:ActivatedRoute,
              private _companyService:CompanyService,
              private _itemService:ItemService ) { }

  ngOnInit() {
        console.log("this.color " + this.color);
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
