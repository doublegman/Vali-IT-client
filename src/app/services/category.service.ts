import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient, private jwt: JwtService) { }

  getCategories() {
    return this.http.get(`${this.jwt.endpoint}/users/${this.jwt.getId()}/categories/`, { headers: this.jwt.headers }).pipe(
      map((res: any) => {
        return res;
      }));
  }

}
