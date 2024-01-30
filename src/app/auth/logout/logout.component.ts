import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { TokenService } from '../token.service';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(private router: Router, private userService: UserService, private tokenService: TokenService) {}

  ngOnInit(): void {
    this.userService.logout().subscribe(() => {
      this.tokenService.clearToken();
      this.router.navigate(['/home']);
    });
  }
}
