import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {
label: string;
  constructor(
              private _router: Router,
              private _route: ActivatedRoute,
              ) { }

  ngOnInit() {
    this.label="TEST";
  }

}
