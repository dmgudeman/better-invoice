import { Company }              from '../company/company';
import { Item }                 from '../item/item';
import { InvoiceInterface }     from "./invoice.interface";


export class Invoice implements InvoiceInterface {
        id?: number;
        beginDate: Date;
        endDate: Date;
        description: string;
        amount: number;
        discount: number;
        Company: Company;
        Items: Item[];

    constructor(id?, beginDate?, endDate?, description?, amount?, discount?, company?, Items?){
        this.id = id;
        this.beginDate   = beginDate || null;
        this.endDate     = endDate || null;
        this.description = description || null;
        this.amount      = amount || 0;
        this.discount    = discount || 0;
        this.Company     = company || null;
        this.Items       = Items || null;
        }
    }