import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  name: string = 'Sample Client';
  rate: number = 30;
  discount: number = 0.2;

  constructor() { }

  ngOnInit() {
  }

}
