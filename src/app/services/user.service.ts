import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {JwtService} from './jwt.service';


@Injectable({
  providedIn: 'root'
})

export class UserService {

  constructor(private jwt: JwtService, private http: HttpClient) {
  }

  updateUserProfile(user): Observable<any> {
    const api = `${this.jwt.endpoint}/users`;
    return this.http.put(api, user,{ headers: this.jwt.headers }).pipe(
      map((res: any) => {
        this.jwt.updateProfileAndToken(res);
        return res.user;
      }));
  }


}
