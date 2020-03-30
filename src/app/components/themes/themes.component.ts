import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {JwtService} from '../../services/jwt.service';
import {HttpClient} from '@angular/common/http';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-themes',
  templateUrl: './themes.component.html',
  styleUrls: ['./themes.component.css']
})
export class ThemesComponent implements OnInit {

  categoryName;
  categoryId;
  themes;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private themeService: ThemeService,
    private jwt: JwtService,
    private http: HttpClient
    ) { }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('category_id');
    this.categoryService.getCategoryById(this.categoryId).subscribe(res=> this.categoryName = res.name);
    this.themes = this.themeService.getThemesByCategoryId(this.categoryId);
    console.log(this.themes);
  }

}
