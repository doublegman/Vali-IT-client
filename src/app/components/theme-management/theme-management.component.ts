import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {JwtService} from '../../services/jwt.service';
import {HttpClient} from '@angular/common/http';
import {ThemeService} from '../../services/theme.service';
import Swal from 'sweetalert2';

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
    this.categoryService.getCategoryById(Number(this.categoryId)).subscribe(res => this.categoryName = res.name);
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

  updateTheme() {
    this.themeService.updateTheme(this.themeForm).subscribe(
      async res => {
        this.theme = res;
        this.errorMessage = '';
        this.imageUrl = '';
        Swal.fire({
          position: 'center',
          icon: 'success',
          html: '<p class="h5 text-dark">Your theme has been updated</p>',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/categories/' + this.categoryId + '/themes/' + this.themeId + '/notes']).then(() => {
            window.location.reload();
          });
        });
      }, error => {
        if (error) {
          this.errorMessage = error.error.message;
        }
      }
    );
  }

}
