import { Item } from '../item/item';

export interface InvoiceInterface {
        id: number;
        beginDate: Date;
        endDate: Date;
        description: string;
        amount: number;
        discount: number;
        companyId: number;
        Items: Item[];
}