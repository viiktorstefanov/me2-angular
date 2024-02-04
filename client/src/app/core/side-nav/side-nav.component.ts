import { Component, EventEmitter, HostListener, OnInit, Output } from '@angular/core';
import { navBarData } from './nav-data';
import { sideBarNav } from '../types/sideBarNav';

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrl: './side-nav.component.css'
})
export class SideNavComponent implements OnInit{
 
  @Output() onToggleSideNav: EventEmitter<sideBarNav> = new EventEmitter();

  collapsed = false;
  screenWidth = 0;
  navData = navBarData;

  @HostListener('window:resize', ['$event'])
  onResize(event : Event) {
    this.screenWidth = window.innerWidth;
    
    if(this.screenWidth <= 768) {
      this.collapsed = false;
      this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth});
    }
  } 

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
  }


  toggleCollapse(): void {
    this.collapsed = !this.collapsed;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth});
  };

  closeSideNav() : void {
    this.collapsed = false;
    this.onToggleSideNav.emit({ collapsed: this.collapsed, screenWidth: this.screenWidth});
  };
}