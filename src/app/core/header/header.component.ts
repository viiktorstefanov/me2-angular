import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../auth/register/register.component';
import { LoginComponent } from '../../auth/login/login.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit{
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  user: boolean = true;

  ngOnInit(): void {
    
  }

  getHeadClass(): string {
    let styleClass = '';

    if(this.collapsed && this.screenWidth > 768) {
      styleClass = 'head-trimmed';
    } else {
      styleClass = 'head-md-screen'//medium size
    }
    return styleClass;
  }

  constructor(private dialogRef: MatDialog) {}

  openRegisterDialog() {
    this.dialogRef.open(RegisterComponent);
  }

  openLoginDialog() {
    this.dialogRef.open(LoginComponent);
  }

}
