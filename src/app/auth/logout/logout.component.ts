import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent implements OnInit{

  errors: string[] = [];

  constructor(private router: Router, private userService: UserService, private toastr: ToastrService) {}

  ngOnInit(): void {
    this.userService.logout().subscribe({
      next: () => {
        this.userService.clearUser();
        this.router.navigate(['/home']);
      },
      error: (err) => {
        if(err.status === 0) {
          this.toastr.error('Unable to connect to the server', 'Error');
          return;
         }
        this.router.navigate(['/not-found']);
        this.errors = [];
        this.errors.push(err.error.message);
        this.errors.forEach(error => this.toastr.error(error, 'Error'));   
      }
    });
  }
}
