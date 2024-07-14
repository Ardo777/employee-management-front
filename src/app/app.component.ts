import {Component} from '@angular/core';
import {UserService} from './services/user.service';
import {AuthGuard} from "./guards/auth-guard";


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(private userService: UserService) { }

  isLoggedIn() {
   return  this.userService.isLoggedIn();
  }

  logout() {
    this.userService.logout();
  }
}
