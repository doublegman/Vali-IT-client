import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {NoteService} from '../../services/note.service';
import {CategoryService} from '../../services/category.service';
import {ThemeService} from '../../services/theme.service';
import Swal from "sweetalert2";

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
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-secondary m-2',
        cancelButton: 'btn btn-secondary m-2',
        container: 'p-5',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: '<p class="h4 text-dark">Are you sure you want to delete this note?</p>',
      html: '<p class="h6 text-danger">You will not be able to revert this!</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false
    }).then((result) => {
      if (result.value) {
      this.noteService.deleteNote(this.noteId).subscribe(
        async (res: any) => {
          swalWithBootstrapButtons.fire({
            position: 'center',
            icon: 'success',
            html: '<p class="h5 text-dark">Your note has been deleted</p>',
            showConfirmButton: false,
            timer: 1500
          }).then(() => {
          this.router.navigate(['/categories/' + this.categoryId + '/themes/' + this.themeId + '/notes']).then(() => {
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

}
