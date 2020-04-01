import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NoteService} from '../../services/note.service';
import {CategoryService} from '../../services/category.service';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.css']
})
export class NoteComponent implements OnInit {

  noteId;
  themeId = '';
  categoryId = '';
  note: any = {};
  categoryName = '';
  themeName = '';
  errorMessage = '';

  constructor(private route: ActivatedRoute,
              private router: Router,
              private noteService: NoteService,
              private categoryService: CategoryService,
              private themeService: ThemeService) { }

  ngOnInit(): void {
    this.noteId = this.route.snapshot.paramMap.get('note_id');
    this.categoryId = this.route.snapshot.paramMap.get('category_id');
    this.themeId = this.route.snapshot.paramMap.get('theme_id');
    this.noteService.getNoteById(this.noteId).subscribe(res => this.note = res);
    this.categoryService.getCategoryById(Number(this.categoryId)).subscribe( res => this.categoryName = res.name);
    this.themeService.getThemeById(Number(this.themeId)).subscribe( res => this.themeName = res.name);
  }

  getContent() {
    try {
      return atob(this.note.contentText);
    } catch (e) {

    }
  }

  async deleteNote() {
    if (confirm("Are you sure you want to delete the note?")) {
      await this.noteService.deleteNote(this.noteId).subscribe(
        async (res: any) => {
          this.router.navigate(['/categories/' + this.categoryId + '/themes/' + this.themeId + '/notes']).then(() => {
            window.setTimeout(function() {
              window.location.reload();
            }, 0);
          });
        }, error => {
          this.errorMessage = error.error.message;
        });
      await (2000);
      alert("Note deleted");
    }
  }
}
