import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../../auth/register/register.component';
import { LoginComponent } from '../../auth/login/login.component';
import { UserService } from '../../auth/user.service';
import { User } from '../../auth/types/User';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent{
  @Input() collapsed = false;
  @Input() screenWidth = 0;

  get isAuthenticated(): boolean {
    return this.userService.isLogged;
  }

  get userInfo() : User | undefined {
    return this.userService.userInfo;
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

  constructor(private dialogRef: MatDialog, private userService: UserService) {}

  openRegisterDialog() {
    this.dialogRef.open(RegisterComponent);
  }

  openLoginDialog() {
    this.dialogRef.open(LoginComponent);
  }

}
