import { Component, Input, input } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getHeadClass(): string {
    let styleClass = '';

    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen'//medium size
    }
    return styleClass;
  }

}
