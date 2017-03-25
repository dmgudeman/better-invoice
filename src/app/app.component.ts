import { Component } from '@angular/core';
import { Ng2PageTransitionModule }  from 'ng2-page-transition';
 import { customTransition } from './shared/custom-transition.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  animations: [customTransition()],
})
export class AppComponent {
  title = 'app works!';
  customAnimation:any = {custom:true, state:""};
}
