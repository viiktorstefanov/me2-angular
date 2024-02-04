import { Component } from '@angular/core';
import { sideBarNav } from './core/types/sideBarNav';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'me2';

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav(data: sideBarNav) : void {
    this.screenWidth = data.screenWidth;
    this.isSideNavCollapsed = data.collapsed;
  }
}
