import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';

const headerDict = {
  'Content-Type': 'application/json',
  'Authorization': 'Bearer_eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJBbmRyZXcxOTEiLCJyb2xlcyI6WyJST0xFX1VTRVIiLCJST0xFX0FETUlOIl0s' +
    'ImlhdCI6MTU4NTA0NDIwNSwiZXhwIjoxNTg1NDA0MjA1fQ.sd-McyUUyCoVd2C07Br_fOuU996icoNICKdg2fXXNO8',
}

const requestOptions = {
  headers: new HttpHeaders(headerDict)
};

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8080/users/';

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl, requestOptions);
  }

}
