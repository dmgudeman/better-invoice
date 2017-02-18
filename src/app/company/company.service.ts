import { Company } from './company';
import { Injectable } from '@angular/core';

@Injectable()
export class CompanyService {
    
    
    companies: Company[] = [
        { id: 0, name: "Exxon", color: "green", hourly: 250, address: "exxon street 123"},
        { id: 1, name: "Texaco", color: "red", hourly: 225 },
        { id: 2, name: "Sinclair", color: "brown", hourly: 200 },
        { id: 3, name: "Shell", color: "yellow", hourly: 200 },
        { id: 4, name: "Arco", color: "blue", hourly: 225 },
        { id: 5, name: "Valero", color: "purple", hourly: 230 }
    ];

    // getCompanies(): Promise<Company[]> {
    //     return Promise.resolve(this.companies);
    // };

    getCompanies() {
         return this.companies;
    }
    
    getCompany(id:number) {
        // return this.companies[id];
    };
    getCompanyById(companyId: number): Promise<Company>{
         let foundCompany = this.getCompanies().find(item =>(item.id === companyId));
       return Promise.resolve(foundCompany);

    }
}