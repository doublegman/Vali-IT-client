import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {JwtService} from '../../services/jwt.service';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

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
      console.log(this.image);
    }
  }

  createCategory() {
    this.categoryService.createCategory(this.categoryForm).subscribe(
      res => {
        this.isCreated = true;
        this.router.navigate(['/categories/' + res.id]).then(() => {
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
