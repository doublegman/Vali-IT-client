import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient, private jwt: JwtService) { }

  getNotes() {
    return this.http.get(`${this.jwt.endpoint}/users/${this.jwt.getId()}/notes/`, { headers: this.jwt.headers }).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      }));
  }

  getNotesByThemeId(id): any[] {
    let tempNotes = [];
    this.getNotes().subscribe( res => {
      for(let i=0; i < res.length; i++){
        if (Number(id) === res[i].theme) {
          tempNotes.push(res[i]);
        }
      }
    });
    console.log('array of notes: ' + tempNotes);
    return tempNotes;
  }
}
