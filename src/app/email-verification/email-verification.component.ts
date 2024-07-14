import {Component} from '@angular/core';
import {Router} from "@angular/router";
import {User} from "../interface/user";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-email-verification',
  templateUrl: './email-verification.component.html',
  styleUrl: './email-verification.component.css'
})
export class EmailVerificationComponent {
  user: User | null = null;
  verificationCode: string = '';
  errorMessage: string | null = null;


  constructor(private router: Router, private userService: UserService) {
    const navigation = this.router.getCurrentNavigation();
    this.user = navigation?.extras?.state?.['user'] || null;
  }

  ngOnInit(): void {
    if (!this.user) {
      console.error('No user information available for email verification.');
    }
  }

  onVerify(): void {
    if (this.user) {
      this.userService.sendVerificationCode(this.user, this.verificationCode).subscribe(
        () => {

          this.router.navigate(['user/login']);
        },
        error => {
          this.errorMessage = 'Verification failed. Please try again.';
          console.error('Verification error:', error);
        }
      );
    }
  }
}
