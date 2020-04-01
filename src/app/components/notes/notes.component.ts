import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {JwtService} from '../../services/jwt.service';
import {HttpClient} from '@angular/common/http';
import {ThemeService} from '../../services/theme.service';
import {NoteService} from '../../services/note.service';

@Component({
  selector: 'app-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.css']
})
export class NotesComponent implements OnInit {

  categoryName;
  themeName;
  categoryId;
  themeId;
  notes;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private themeService: ThemeService,
    private noteService: NoteService,
    private jwt: JwtService,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('category_id');
    this.themeId = this.route.snapshot.paramMap.get('theme_id');
    this.categoryService.getCategoryById(this.categoryId).subscribe(res=> this.categoryName = res.name);
    this.themeService.getThemeById(this.themeId).subscribe(res=> this.themeName = res.name);
    this.notes = this.noteService.getNotesByThemeId(this.themeId);
    console.log(this.notes);
  }

  async deleteTheme() {
    if (confirm("Are you sure you want to delete the theme?")) {
      this.themeService.deleteTheme(Number(this.themeId)).subscribe(res => {
        this.router.navigate(['/categories/' + this.categoryId + '/themes/all']).then(() => {
          window.setTimeout(function() {
            window.location.reload();
          }, 0);
        });
      }, error => {
        this.errorMessage = error.error.message;
      });
      await (2000);
      alert("Theme deleted");
    }
  }



}
