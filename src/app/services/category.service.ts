import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {catchError, map} from 'rxjs/operators';
import {Observable} from 'rxjs';

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

  getCategoryById(id) {
    return this.http.get(`${this.jwt.endpoint}/users/${this.jwt.getId()}/categories/${id}`, { headers: this.jwt.headers }).pipe(
      map((res: any) => {
        return res;
      }));
  }

  updateCategory(category): Observable<any> {
    const api = `${this.jwt.endpoint}/users/${this.jwt.getId()}/categories/`;
    return this.http.put(api, category, {headers: this.jwt.headers}).pipe(
      map((res: any) => {
        return res;
      }));
  }

  createCategory(category): Observable<any> {
    const api = `${this.jwt.endpoint}/users/${this.jwt.getId()}/categories/`;
    return this.http.post(api, category, {headers: this.jwt.headers}).pipe(
      map((res: any) => {
        return res;
      }));
  }

  deleteCategory(categoryId) {
    const api = `${this.jwt.endpoint}/users/${this.jwt.getId()}/categories/${Number(categoryId)}`;
    return this.http.delete(api, {headers: this.jwt.headers}).pipe(
      map((res: any) => {
        return res;
      }));
  }
}
