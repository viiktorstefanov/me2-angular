import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrl: './main.component.css'
})
export class MainComponent {

  @Input() collapsed = false;
  @Input() screenWidth = 0;

  getMainClass(): string {
    let styleClass = '';

    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'main-trimmed';
    } else if(this.collapsed && this.screenWidth <= 768 && this.screenWidth > 0) {
      styleClass = 'main-md-screen'//medium size
    }
    return styleClass;
  }
}
