import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  errors: string[] = [];

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.userService.logout().subscribe({
      next: () => {
        this.userService.clearUser();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        this.router.navigate(['/not-found']);
        this.errors = [];
        this.errors.push(err.error.message);
        this.errors.forEach(error => this.toastr.error(error, 'Error'));   
      }
    });
  }
}
