import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {JwtService} from '../../services/jwt.service';
import {HttpClient} from '@angular/common/http';
import {ThemeService} from '../../services/theme.service';
import {NoteService} from '../../services/note.service';
import Swal from "sweetalert2";

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
  notes = [];
  errorMessage = '';
  search: string;
  page: number = 1;

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
    this.noteService.getNotesByThemeId(this.themeId).subscribe(res => this.notes = res);
  }

  async deleteTheme() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-secondary m-2',
        cancelButton: 'btn btn-secondary m-2',
        container: 'p-5',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: '<p class="h4 text-dark">Are you sure you want to delete this theme?</p>',
      html: '<p class="h6 text-danger">You will not be able to revert this!</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false
    }).then((result) => {
      if (result.value) {
        this.themeService.deleteTheme(this.themeId).subscribe(
          async (res: any) => {
            swalWithBootstrapButtons.fire({
              position: 'center',
              icon: 'success',
              html: '<p class="h5 text-dark">Your theme has been deleted</p>',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/categories/' + this.categoryId + '/themes/all']).then(() => {
                window.location.reload();
              });
            });
          }, error => {
            this.errorMessage = error.error.message;
            Swal.fire('Operation aborted', this.errorMessage, 'error');
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {}
    });
  }

  getEncodedContent(string): string {
    let innerHtml = atob(string).replace(/h1/gi, "h6");
    innerHtml = innerHtml.replace(/h2/gi, "h6");
    innerHtml = innerHtml.replace(/h3/gi, "h6");
    innerHtml = innerHtml.replace(/h4/gi, "h6");
    return innerHtml.replace(/h5/gi, "h6");
  }

}
