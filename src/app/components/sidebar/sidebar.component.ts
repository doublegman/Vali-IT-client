import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';
import {ThemeService} from '../../services/theme.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

  categories = [];
  themes = [];

  constructor(private categoriesService: CategoryService, private themeService: ThemeService) { }

  ngOnInit(): void {
    if(this.localStorageItem('user_id')) {
      this.categoriesService.getCategories().subscribe(res => this.categories = res);
      this.themeService.getThemes().subscribe(res => {this.themes = res});
    }
  }

  getThemesByCategoryId(id): any[] {
    let tempThemes = [];
    for(let i=0; i<this.themes.length; i++){
      if (Number(id) === this.themes[i].category) {
        tempThemes.push(this.themes[i]);
      }
    }
    return tempThemes;
  }

  localStorageItem(key: string): string {
    return localStorage.getItem(key);
  }

}
