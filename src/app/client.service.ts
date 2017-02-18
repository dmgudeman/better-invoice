import { Injectable } from '@angular/core';

@Injectable()
export class ClientService {

  constructor() { }

  getClients() {
    return [
      {
        name: 'First Client',
      },
      {
        name: 'Second Client',
      },
      {
        name: 'Third Client',
      }
    ]
  }

}
