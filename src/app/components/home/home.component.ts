import { Component, OnInit } from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {UserService} from '../../services/user.service';
import {NoteService} from '../../services/note.service';
import {CategoryService} from '../../services/category.service';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isLoggedIn: boolean = false;
  user: any = {};
  notes: any = [];
  categories: any = [];
  themes: any = [];

  constructor(
    private jwt: JwtService,
    private categoryService: CategoryService,
    private themeService: ThemeService,
    private noteService: NoteService,
  ) { }

  ngOnInit(): void {
    if (this.jwt.getId()) {
      this.isLoggedIn = true;
      this.jwt.getUserProfile().subscribe( res => this.user = res);
      this.noteService.getNotes().subscribe(res => this.notes = this.sortByStartDate(res));
      this.categoryService.getCategories().subscribe(res => this.categories = res);
      this.themeService.getThemes().subscribe(res => this.themes = res);
    }
  }

  getTime(date?: Date) {
    return date != null ? new Date(date).getTime() : 0;
  }

  sortByStartDate(array: any[]): any[] {
    return array.sort((a: any, b: any) => {
      return -this.getTime(a.lastModifiedDate) - this.getTime(b.lastModifiedDate);
    });
  }

  getCategoryIdByNote(note): number {
    for (let category of this.categories) {
      for(let themeId of category.themes) {
        if (themeId === note.theme) {
          return category.id;
        }
      }
    }
  }

  getCategoryNameByNote(note): number {
    for (let category of this.categories) {
      for(let themeId of category.themes) {
        if (themeId === note.theme) {
          return category.name;
        }
      }
    }
  }

  getThemeNameById(id): string {
    for (let theme of this.themes) {
        if (id === theme.id) {
          return theme.name;
        }
    }
  }

  getNoteDecryptedContent(note): string {
    return atob(note.contentText);
  }


}
