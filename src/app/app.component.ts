import { Component, HostBinding } from '@angular/core';
// import { Ng2PageTransitionModule }  from 'ng2-page-transition';
//  import { customTransition } from './shared/custom-transition.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  // animations: [customTransition]
})
export class AppComponent {
  // @HostBinding('@routeAnimation') routeAnimation = true;
// @HostBinding('style.display')   display = 'block';
// @HostBinding('style.position')  position = 'absolute';
  title = 'app works!';
  customAnimation:any = {custom:true, state:""};
}
