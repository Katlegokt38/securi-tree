import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'securitree';
  sideBarOpen = false;
  
  constructor() { }

    ngOnInit() {

    }
  

  sideBarToggler(){
    this.sideBarOpen = !this.sideBarOpen
  }
}
