import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {JwtService} from './jwt.service';
import {map} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  constructor(private http: HttpClient, private jwt: JwtService) { }

  getNotes() {
    return this.http.get(`${this.jwt.endpoint}/users/${this.jwt.getId()}/notes/`, { headers: this.jwt.headers }).pipe(
      map((res: any) => {
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
    return tempNotes;
  }

  getNoteById(id) {
    return this.http.get(`${this.jwt.endpoint}/users/${this.jwt.getId()}/notes/${id}`, { headers: this.jwt.headers }).pipe(
      map((res: any) => {
        return res;
      }));
  }


  createNote(note): Observable<any> {
    const api = `${this.jwt.endpoint}/users/${this.jwt.getId()}/notes/`;
    return this.http.post(api, note, {headers: this.jwt.headers}).pipe(
      map((res: any) => {
        return res;
      }));
  }


  deleteNote(noteId) {
    const api = `${this.jwt.endpoint}/users/${this.jwt.getId()}/notes/${Number(noteId)}`;
    return this.http.delete(api, {headers: this.jwt.headers}).pipe(
      map((res: any) => {
        return res;
      }));
  }

  updateNote(note): Observable<any> {
    const api = `${this.jwt.endpoint}/users/${this.jwt.getId()}/notes/`;
    return this.http.put(api, note, {headers: this.jwt.headers}).pipe(
      map((res: any) => {
        return res;
      }));
  }
}
