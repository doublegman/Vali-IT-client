import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {ThemeService} from '../../services/theme.service';
import {JwtService} from '../../services/jwt.service';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryName;
  categoryId;
  notes;
  themes: any;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private themeService: ThemeService
  ) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('category_id');
    this.categoryService.getCategoryById(this.categoryId).subscribe(res=> this.categoryName = res.name);
    this.themes = this.themeService.getThemesByCategoryId(this.categoryId);
  }

  async deleteCategory() {
    if (confirm("Are you sure you want to delete the category?")) {
      await this.categoryService.deleteCategory(this.categoryId).subscribe(
        async (res: any) => {
          this.router.navigate(['/categories/']).then(() => {
            window.setTimeout(function() {
              window.location.reload();
            }, 0);
          });
        }, error => {
          this.errorMessage = error.error.message;
        });
      await(2000);
      alert("Category deleted");
    }
  }

}
