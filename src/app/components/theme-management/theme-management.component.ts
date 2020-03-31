import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {JwtService} from '../../services/jwt.service';
import {HttpClient} from '@angular/common/http';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-theme-management',
  templateUrl: './theme-management.component.html',
  styleUrls: ['./theme-management.component.css']
})
export class ThemeManagementComponent implements OnInit {

  categoryId;
  themeId;
  categoryName = '';
  theme: any = {};
  themeForm: any = {};
  errorMessage = '';
  imageUrl = '';
  image: File;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private themeService: ThemeService,
    private categoryService: CategoryService,
    private jwt: JwtService,
    private http: HttpClient
  ) {
  }


  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('category_id');
    this.themeId = this.route.snapshot.paramMap.get('theme_id');
    this.themeForm.id = this.themeId;
    this.themeService.getThemeById(this.themeId).subscribe((res: any) => this.theme = res);
    this.categoryService.getCategoryById(Number(this.categoryId)).subscribe( res => this.categoryName = res.name);
  }

  async onSubmit() {
    if (!this.themeForm.name) {
      this.themeForm.name = this.theme.name;
    }
    if (this.image) {
      const api = `${this.jwt.endpoint}/uploadImage`;
      let tempImage = new FormData();
      tempImage.append('file', this.image);
      await this.http.post(api, tempImage).subscribe((res: any) => {
        this.themeForm.imageUrl = res.imageUrl;
        this.updateTheme();
      });
      return;
    } else {
      this.updateTheme();
    }
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
      console.log(this.image);
    }
  }

  async deleteTheme() {
    if (confirm("Are you sure you want to delete the theme?")) {
      await this.themeService.deleteTheme(this.themeId).subscribe(
        async (res: any) => {
          console.log(res.message);
          await (2000);
          this.router.navigate(['/categories/' + this.categoryId + '/' + 'themes/']).then(() => {
            window.setTimeout(function() {
              window.location.reload();
            }, 0);
          });
        }, error => {
          this.errorMessage = error.error.message;
        });
      await(2000);
      alert("Theme deleted");
    }
  }

  updateTheme() {
    this.themeService.updateTheme(this.themeForm).subscribe(
      async res => {
        this.theme = res;
        this.errorMessage = '';
        this.imageUrl = '';
        await this.router.navigate(['/categories/' + this.categoryId + '/' + 'themes/' + this.themeId]).then(() => {
          window.setTimeout(function() {
            window.location.reload();
          }, 0);
        });
        alert("Theme updated");
      }, error => {
        if (error) {
          this.errorMessage = error.error.message;
        }
      }
    );
  }


}
