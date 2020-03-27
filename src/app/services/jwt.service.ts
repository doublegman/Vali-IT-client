import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {catchError, map, tap} from 'rxjs/operators';
import {Observable, throwError} from 'rxjs';
import {User} from '../models/user';
import {Router} from '@angular/router';
import {Login} from '../models/login';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  endpoint = 'http://localhost:8080';
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  registrationMessage = '';

  constructor(
    private http: HttpClient,
    public router: Router
  ) {
  }


  register(user: User) {
    return this.http.post(`${this.endpoint}/auth/register`, user);
  }


  login(login: Login) {
    return this.http.post(`${this.endpoint}/auth/login`, login);
  }

  getToken() {
    return localStorage.getItem('access_token');
  }

  saveToken(res) {
    if (localStorage.getItem('access_token') !== null) {
      localStorage.removeItem('access_token');
    }
    localStorage.setItem('access_token', res.token);
    localStorage.setItem('user_id', res.id);
    localStorage.setItem('user_username', res.username);
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
    const removeUsername = localStorage.removeItem('user_username');
    const removeCurrentUser = localStorage.removeItem('current_user');
/*    if (removeToken == null) {
      this.router.navigate(['log-in']);
    }*/
  }

  getUserProfile(): Observable<User> {
    const api = `${this.endpoint}/users/${this.getId()}`;
    return this.http.get(api, { headers: this.headers }).pipe(
      map((res: any) => {
        return res;
      }),
      catchError(this.handleError)
    );
  }

  updateProfileAndToken(res) {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_id');
    localStorage.removeItem('user_username');
    localStorage.removeItem('current_user');
    localStorage.setItem('access_token', res.token);
    localStorage.setItem('user_id', res.user.id);
    localStorage.setItem('user_username', res.user.username);
    localStorage.setItem('current_user', res.user);
  }

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
