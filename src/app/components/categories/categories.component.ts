import { Component, OnInit } from '@angular/core';
import {CategoryService} from '../../services/category.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {

  categories = [];
  search: string;
  page: number = 1;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    if(this.localStorageItem('user_id')) {
      this.categoryService.getCategories().subscribe(res => this.categories = res);
    }
  }

  localStorageItem(key: string): string {
    return localStorage.getItem(key);
  }

}
