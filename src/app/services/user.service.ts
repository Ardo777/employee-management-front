import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {User} from "../interface/user";
import {catchError, Observable, of, tap} from "rxjs";
import {Router} from "@angular/router";
import {Credentials} from "../interface/credentials";


@Injectable()
export class UserService {
  private loggedIn = false;
  private baseURL = "http://localhost:8080";

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  register(user: any): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/user/register`, user).pipe(
      catchError(error => {
        console.error('Registration failed:', error);
        return of(null);
      })
    );
  }

  sendVerificationCode(user: User, verificationCode: string): Observable<any> {
    return this.httpClient.post(`${this.baseURL}/user/emailVerification`, {user, verificationCode});
  }


  login(credentials: Credentials): Observable<any> {
    return this.httpClient.post<any>(`${this.baseURL}/user/login`, credentials).pipe(
      tap(response => {
        console.log("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");
        sessionStorage.setItem('token', response.jwt);
        console.log('token', response.jwt);
        this.router.navigate(['/employees']);
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token');
    this.router.navigate(['/user/login']);
  }

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('token');
  }
}
