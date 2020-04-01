import {Component, OnInit, ViewChild} from '@angular/core';
import {ThemeService} from '../../services/theme.service';
import {JwtService} from '../../services/jwt.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {NoteService} from '../../services/note.service';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {ChangeEvent} from '@ckeditor/ckeditor5-angular';
import {CategoryService} from '../../services/category.service';


@Component({
  selector: 'app-new-note',
  templateUrl: './new-note.component.html',
  styleUrls: ['./new-note.component.css']
})

export class NewNoteComponent implements OnInit {

  noteForm: any = {};
  themeId = '';
  categoryId = '';
  themeName = '';
  categoryName = '';
  errorMessage = '';
  isCreated: boolean = false;
  image: File;
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
    this.categoryId = this.route.snapshot.paramMap.get('category_id');
    this.themeId = this.route.snapshot.paramMap.get('theme_id');
    this.categoryService.getCategoryById(this.categoryId).subscribe(res => this.categoryName = res.name);
    this.themeService.getThemeById(this.themeId).subscribe(res => this.themeName = res.name);
    this.noteForm.theme = {};
    this.noteForm.theme.id = Number(this.themeId);
  }

  onSubmit() {
    if (this.image) {
      const api = `${this.jwt.endpoint}/uploadImage`;
      let tempImage = new FormData();
      tempImage.append('file', this.image);
      this.http.post(api, tempImage).subscribe((res: any) => {
        this.noteForm.imageUrl = res.imageUrl;
        this.createNote();
      });
      return;
    } else {
      this.createNote();
    }
  }

  onEditorChange( {editor}: ChangeEvent) {
    this.noteForm.contentText = btoa(editor.getData());
    console.log(this.noteForm.contentText);
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  createNote() {
    this.noteService.createNote(this.noteForm).subscribe(
      res => {
        this.isCreated = true;
        this.router.navigate(['/categories/' + this.categoryId + '/' + 'themes/' + this.themeId + '/notes/']).then(() => {
          window.setTimeout(function() {
            window.location.reload();
          }, 0);
        });
      }, error => {
        if (error) {
          this.errorMessage = error.error.message;
        }
      }
    );
  }

}
