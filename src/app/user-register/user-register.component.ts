import {Component} from '@angular/core';
import {User} from "../interface/user";
import {UserService} from "../services/user.service";
import {NavigationExtras, Router} from "@angular/router";

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrl: './user-register.component.css'
})
export class UserRegisterComponent {
  user: User = new User();
  errorMessage: string | null = null;

  constructor(private userService: UserService, private router: Router) {
  }

  onSubmit(): void {
    if (this.user.password !== this.user.confirmationPassword) {
      this.errorMessage = 'Passwords do not match.';
      return;
    }

    this.userService.register(this.user).subscribe(
      (registeredUser) => {
        console.log('Registered user:', registeredUser);
        this.user.verificationCode = registeredUser.verificationCode;
        console.log('Verification code:', this.user.verificationCode);
        const navigationExtras: NavigationExtras = {
          state: {
            user: this.user
          }
        };
        this.router.navigate(['user/email-verification'], navigationExtras);
      },
      error => {
        this.errorMessage = 'Registration failed. Please try again.';
        console.error('Registration error:', error);
      }
    );
  }


}

