import { Component, OnInit } from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import Swal from "sweetalert2";

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  form: any = {};
  errorMessage = '';
  profilePictureUrl = '';
  image: File;
  arePasswordsDifferent = false;

  constructor(
    private jwt: JwtService,
    private router: Router,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.form.gender = true;
  }

  onaSubmit() {
    if (!this.arePasswordsDifferent) {
    if (this.image) {
      const api = `${this.jwt.endpoint}/uploadImage`;
      let tempImage = new FormData();
      tempImage.append('file', this.image);
      this.http.post(api, tempImage).subscribe((res: any) => {
        this.form.profilePictureUrl = res.imageUrl;
        this.register();
      });
      return;
    } else {
      this.register();
    }} else return;
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
      console.log(this.image);
    }
  }

  register() {
    this.jwt.register(this.form).subscribe(
      (res: any) => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          html: '<p class="h5 text-dark">Account has been created!<br>Please log in.</p>',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
          this.router.navigate(['/login']).then();
        });
      }, error => {
        if (error) {
          this.errorMessage = error.error.message;
        }
      }
    );
  }

  checkPassword(event) {
    if (this.form.password && this.form.password !== event.target.value) {
      this.arePasswordsDifferent = true;
    } else if (event.target.value === '' || !event.target.value) {
      this.arePasswordsDifferent = false;
    } else {
      this.arePasswordsDifferent = false;
    }
  }
}
