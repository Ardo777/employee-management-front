import {Component} from '@angular/core';
import {UserService} from "../services/user.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrl: './user-login.component.css'
})
export class UserLoginComponent {
  credentials = {username: '', password: ''};

  constructor(private userService: UserService, private router: Router) {
  }

  login(): void {
    this.userService.login(this.credentials).subscribe(success => {
      if (success) {
        this.router.navigate(['/employees']);
      } else {
        console.error('Login failed. Invalid credentials.');
      }
    });
  }
}
