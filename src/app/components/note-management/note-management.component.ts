import { Component, OnInit } from '@angular/core';
import {NoteService} from '../../services/note.service';
import {ThemeService} from '../../services/theme.service';
import {CategoryService} from '../../services/category.service';
import {JwtService} from '../../services/jwt.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-note-management',
  templateUrl: './note-management.component.html',
  styleUrls: ['./note-management.component.css']
})

export class NoteManagementComponent implements OnInit {

  noteForm: any = {};
  note: any = {};
  noteId = '';
  themeId = '';
  categoryId = '';
  themeName = '';
  categoryName = '';
  errorMessage = '';
  isCreated: boolean = false;
  image: File;
  imageUrl = '';
  public Editor = ClassicEditor;

  constructor(private noteService: NoteService,
              private themeService: ThemeService,
              private categoryService: CategoryService,
              private jwt: JwtService,
              private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.noteId = this.route.snapshot.paramMap.get('note_id');
    this.categoryId = this.route.snapshot.paramMap.get('category_id');
    this.themeId = this.route.snapshot.paramMap.get('theme_id');
    this.categoryService.getCategoryById(this.categoryId).subscribe(res => this.categoryName = res.name);
    this.themeService.getThemeById(this.themeId).subscribe(res => this.themeName = res.name);
    this.noteService.getNoteById(this.noteId).subscribe(res => this.note = res);
    this.noteForm.id = this.noteId;
  }

  async onSubmit() {
    if (!this.noteForm.name) {
      this.noteForm.name = this.note.name;
    }
    if (this.image) {
      const api = `${this.jwt.endpoint}/uploadImage`;
      let tempImage = new FormData();
      tempImage.append('file', this.image);
      await this.http.post(api, tempImage).subscribe((res: any) => {
        this.noteForm.imageUrl = res.imageUrl;
        this.updateNote();
      });
      return;
    } else {
      this.updateNote();
    }
  }

  onEditorChange( {editor}: ChangeEvent) {
    this.noteForm.contentText = btoa(editor.getData());
    console.log(this.noteForm.contentText);
  }

  getDecodedContent(): string {
    return atob(this.note.contentText);
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
      console.log(this.image);
    }
  }

  updateNote() {
    this.noteService.updateNote(this.noteForm).subscribe(
      async res => {
        this.note = res;
        this.errorMessage = '';
        this.imageUrl = '';
        await this.router.navigate(['/categories/' + this.categoryId + '/themes/' + this.themeId + '/notes/' + this.noteId]).then(() => {
          window.setTimeout(function() {
            window.location.reload();
          }, 0);
        });
        alert("Note updated");
      }, error => {
        if (error) {
          this.errorMessage = error.error.message;
        }
      }
    );
  }

}
