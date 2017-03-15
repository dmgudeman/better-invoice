import { Invoice } from './invoice';
import { Item } from '../item/item';
import { ItemService } from '../item/item.service';




export class InvoiceService {
        
        invoice: Invoice;



        // constructor ( private _itemService: ItemService) {}

        ngInit () {
                // this.testItemsByDate();
        }

        // getInvoicesByUserId(userId: number) {

        // }
        // testItemsByDate(no=1, date1='1/1/2001', date2='1/1/2002'){
        //         this._itemService.getItemsByDateRange(no, date1, date2);

        // }

        // getInvoiceById(invoiceId: number) {
        // }
        makeInvoice(user, co) { return this.invoice};
        // makeInvoice2( companyId: number, beginDate:Date, endDate:Date, description?: string, amount?:number, discount?: number ) {
        //         // let items =  this._itemService.getItemsByDateRange(companyId, beginDate, endDate);
        //         // this.invoice = {beginDate:beginDate, endDate:endDate, description:description, amount: amount, discount:discount, companyId:companyId, Items:items}
        //         // return this.invoice;
        // }

        // addInvoice(invoice: Invoice) {
        // }
        // getInvoices() {
        // }




}