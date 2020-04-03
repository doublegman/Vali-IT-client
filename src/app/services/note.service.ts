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

  getNotesByThemeId(id): Observable<any> {
    return this.getNotes().pipe(map((res: any) => {
        let tempNotes = [];
        for(let note of res) {
          if (note.theme === Number(id)){
            tempNotes.push(note);
          }
        }
        return tempNotes;
      }
    ));
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
