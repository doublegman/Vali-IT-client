import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {JwtService} from '../../services/jwt.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-category',
  templateUrl: './new-category.component.html',
  styleUrls: ['./new-category.component.css']
})
export class NewCategoryComponent implements OnInit {

  categoryForm: any = {};
  errorMessage = '';
  isCreated: boolean = false;
  image: File;

  constructor(private categoryService: CategoryService,
              private jwt: JwtService,
              private http: HttpClient,
              private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit() {
    if (this.image) {
      const api = `${this.jwt.endpoint}/uploadImage`;
      let tempImage = new FormData();
      tempImage.append('file', this.image);
      this.http.post(api, tempImage).subscribe((res: any) => {
        this.categoryForm.imageUrl = res.imageUrl;
        this.createCategory();
      });
      return;
    } else {
      this.createCategory();
    }
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  createCategory() {
    this.categoryService.createCategory(this.categoryForm).subscribe(
      res => {
        this.isCreated = true;
        Swal.fire({
          position: 'center',
          icon: 'success',
          html: '<p class="h5 text-dark">' + res.name + ' category has been created</p>',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/categories/' + res.id + '/themes/all']).then(() => {
            window.location.reload();
          });
        })
      }, error => {
        if (error) {
          this.errorMessage = error.error.message;
        }
      }
    );
  }
}
