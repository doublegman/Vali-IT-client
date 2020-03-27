import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  constructor(private http: HttpClient, private jwt: JwtService) { }

  getThemes() {
    return this.http.get(`${this.jwt.endpoint}/users/${this.jwt.getId()}/themes/`, { headers: this.jwt.headers }).pipe(
      map((res: any) => {
        return res;
      }));
  }

}
