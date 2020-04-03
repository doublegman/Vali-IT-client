import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CategoryService} from '../../services/category.service';
import {ThemeService} from '../../services/theme.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css']
})
export class CategoryComponent implements OnInit {

  categoryName;
  categoryId;
  notes;
  themes = [];
  errorMessage = '';
  search2: string;
  page: number = 1;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private categoryService: CategoryService,
    private themeService: ThemeService
  ) {
  }

  ngOnInit(): void {
    this.categoryId = this.route.snapshot.paramMap.get('category_id');
    this.categoryService.getCategoryById(this.categoryId).subscribe(res => this.categoryName = res.name);
    this.themeService.getThemesByCategoryId(this.categoryId).subscribe(res => this.themes = res);
  }

  deleteCategory() {
    const swalWithBootstrapButtons = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-secondary m-2',
        cancelButton: 'btn btn-secondary m-2',
        container: 'p-5',
      },
      buttonsStyling: false,
    });
    swalWithBootstrapButtons.fire({
      title: '<p class="h4 text-dark">Are you sure you want to delete this category?</p>',
      html: '<p class="h6 text-danger">You will not be able to revert this!</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: false
    }).then((result) => {
      if (result.value) {
        this.categoryService.deleteCategory(this.categoryId).subscribe(
          async (res: any) => {
            swalWithBootstrapButtons.fire({
              position: 'center',
              icon: 'success',
              html: '<p class="h5 text-dark">Your category has been deleted</p>',
              showConfirmButton: false,
              timer: 1500
            }).then(() => {
              this.router.navigate(['/categories']).then(() => {
                window.location.reload();
              });
              console.log(res.message);
            });
          }, error => {
            this.errorMessage = error.error.message;
            Swal.fire('Operation aborted', this.errorMessage, 'error');
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {}
    });
  }

}
