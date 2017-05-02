export class Address {
    city:string;
    country:string;
    invalid:boolean;
    latitude:number;
    longitude:number;
    postalCode:string;
    street1:string;
    street2:string;
    state:string;
    updatedAt:Date;
    createdAt:Date;

   constructor(city:string, country:string, invalid:boolean, postalCode:string, state:string, street1:string, street2?:string){
       this.city = city;
       this.country = country;
       this.invalid = false;
       this.postalCode = postalCode;
       this.state = state;
       this.street1 = street1;
       this.street2 = street2;
   }
} 
