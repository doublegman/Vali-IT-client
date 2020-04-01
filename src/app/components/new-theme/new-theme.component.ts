import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {JwtService} from '../../services/jwt.service';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-new-theme',
  templateUrl: './new-theme.component.html',
  styleUrls: ['./new-theme.component.css']
})
export class NewThemeComponent implements OnInit {

  themeForm: any = {};
  categoryId = '';
  categoryName = '';
  errorMessage = '';
  isCreated: boolean = false;
  image: File;

  constructor(private themeService: ThemeService,
              private categoryService: CategoryService,
              private jwt: JwtService,
              private http: HttpClient,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('category_id');
    this.categoryService.getCategoryById(this.categoryId).subscribe(res => this.categoryName = res.name);
    this.themeForm.category = {};
    this.themeForm.category.id = Number(this.categoryId);
  }

  onSubmit() {
    if (this.image) {
      const api = `${this.jwt.endpoint}/uploadImage`;
      let tempImage = new FormData();
      tempImage.append('file', this.image);
      this.http.post(api, tempImage).subscribe((res: any) => {
        this.themeForm.imageUrl = res.imageUrl;
        this.createTheme();
      });
      return;
    } else {
      this.createTheme();
    }
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
      console.log(this.image);
    }
  }

  createTheme() {
    this.themeService.createTheme(this.themeForm).subscribe(
      res => {
        this.isCreated = true;
        this.router.navigate(['/categories/' + this.categoryId + '/' + 'themes/' + res.id]).then(() => {
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
