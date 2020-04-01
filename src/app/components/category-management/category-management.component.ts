import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {JwtService} from '../../services/jwt.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-category-management',
  templateUrl: './category-management.component.html',
  styleUrls: ['./category-management.component.css']
})
export class CategoryManagementComponent implements OnInit {

  categoryId;
  category: any = {};
  categoryForm: any = {};
  errorMessage = '';
  imageUrl = '';
  image: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private jwt: JwtService,
    private http: HttpClient
  ) {
  }


  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('id');
    this.categoryService.getCategoryById(this.categoryId).subscribe((res: any) => this.category = res);
    this.categoryForm.id = this.categoryId;
  }

  async onSubmit() {
    if (!this.categoryForm.name) {
      this.categoryForm.name = this.category.name;
    }
    if (this.image) {
      const api = `${this.jwt.endpoint}/uploadImage`;
      let tempImage = new FormData();
      tempImage.append('file', this.image);
      await this.http.post(api, tempImage).subscribe((res: any) => {
        this.categoryForm.imageUrl = res.imageUrl;
        this.updateCategory();
      });
      return;
    } else {
      this.updateCategory();
    }
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
      console.log(this.image);
    }
  }

  updateCategory() {
    this.categoryService.updateCategory(this.categoryForm).subscribe(
      async res => {
        this.category = res;
        this.errorMessage = '';
        this.imageUrl = '';
        await this.router.navigate(['/categories/' + this.categoryId]).then(() => {
          window.setTimeout(function() {
            window.location.reload();
          }, 0);
        });
        alert("Category updated");
      }, error => {
        if (error) {
          this.errorMessage = error.error.message;
        }
      }
    );
  }

}
