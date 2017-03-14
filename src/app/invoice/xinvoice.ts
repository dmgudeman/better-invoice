import { Item } from '../item/item';
export class Invoice  {
    
    ivTitle?: string;
    ivFromDate: string;
    ivToDate: string;
    ivDiscountPercent: number ;
    ivDiscountAmount: number;
    ivDescription: string ;
    ivItems: Item[];
    id: number;
    ivCoId:number;
    ivUid: number;

    constructor(_ivTitle: string, _ivFromDate: string, _ivToDate: string,
                _ivDiscountPercent:number, _ivDiscountAmount:number, _ivDescription: string, 
                _ivItems: Item[], _ivCoId:number, _ivUid: number, _id?:number ) {
         if(!_id) {
             _id = this.makeInvoiceId();
         }
               
        
        this.ivTitle = _ivTitle;
        this.ivFromDate= _ivFromDate;
        this.ivToDate=_ivToDate;
        this.ivDiscountPercent=_ivDiscountPercent;
        this.ivDiscountAmount=_ivDiscountAmount;
        this.ivDescription=_ivDescription;
        this.ivItems = _ivItems;
        this.ivCoId= _ivCoId;
        this.ivUid = _ivUid;
        this.id = _id;
         
    }

makeInvoiceId(){
        let id:number;
        id = Math.floor(Math.random() * 10000);
        return id;
    }
}