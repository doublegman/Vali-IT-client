import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {Login} from '../models/login';
import {Token} from '../models/token';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  endpoint = 'http://localhost:8080';
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  currentUser: {} = {};

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }


  register(user: User) {
    const api = `${this.endpoint}/auth/register`;
    return this.http.post(api, user).subscribe((res: any ) => console.log(res))
/*      .pipe(
        catchError(this.handleError)
      )*/;
  }


  login(login: Login) {
    return this.http.post<Token>(`${this.endpoint}/auth/login`, login)
      .subscribe((res: any) => {
        if (localStorage.getItem('access_token') !== null) {
          localStorage.removeItem('access_token');
        }
        localStorage.setItem('access_token', res.token);
        localStorage.setItem('user_id', res.id);
        // tslint:disable-next-line:no-shadowed-variable
        this.getUserProfile().subscribe((res) => {
          this.currentUser = res;
          console.log(this.currentUser);
          // this.router.navigate(['user-profile/' + res.msg._id]);
        });
      });
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  getId() {
    return localStorage.getItem('user_id');
  }

  get isLoggedIn(): boolean {
    const authToken = localStorage.getItem('access_token');
    return (authToken !== null);
  }

  doLogout() {
    const removeToken = localStorage.removeItem('access_token');
    const removeId = localStorage.removeItem('user_id');
    console.log(this.getId());
/*    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }*/
  }

  // User profile
  getUserProfile(): Observable<User> {
    const api = `${this.endpoint}/users/${this.getId()}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: User) => {
        return new User(res.username, res.password, res.email, res.firstName, res.lastName, res.gender, res.profilePicture);
      }),
      catchError(this.handleError)
    );
  }

  // Error
  handleError(error: HttpErrorResponse) {
    let msg = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      msg = error.error.message;
    } else {
      // server-side error
      msg = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(msg);
  }
}
