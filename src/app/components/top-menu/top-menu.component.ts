import { Component, OnInit } from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {Router} from '@angular/router';
import Swal from "sweetalert2";

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  isLoggedIn = false;
  profilePictureUrl = '';

  constructor(private jwt: JwtService, private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = this.jwt.isLoggedIn;
    if (this.isLoggedIn) {
      this.jwt.getUserProfile().subscribe(res => this.profilePictureUrl = res.profilePictureUrl);
    }
  }

  async logout(): Promise<void> {
    const swal = Swal.mixin({
      customClass: {
        confirmButton: 'btn btn-secondary m-2',
        cancelButton: 'btn btn-secondary m-2',
        container: 'p-5',
      },
      buttonsStyling: false,
    });
    swal.fire({
      title: '<p class="h4 text-dark">Are you sure you want to log out?</p>',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'No',
      reverseButtons: false
    }).then((result) => {
      if (result.value) {
      if(Number(this.jwt.getId()) == 1) {
        console.log('Enters here');
        swal.fire({
          html: '<img class="img-fluid" src="assets/images/4watching.png">',
          background: 'transparent',
          showCancelButton: false,
          showConfirmButton: false,
          reverseButtons: false,
          timer: 3000
      }).then( res => {
          this.jwt.doLogout();
          this.router.navigate(['/login']).then(() => {
            window.location.reload();})
          }
        );} else {
        this.jwt.doLogout();
        this.router.navigate(['/login']).then(() => {
          window.location.reload();})
      }
      } else if (result.dismiss === Swal.DismissReason.cancel) {}
});
}

  public localStorageItem(key: string): string {
    return localStorage.getItem(key);
  }

}
