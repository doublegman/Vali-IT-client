import { Component, OnInit } from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form: any = {};
  isLoggedIn = false;
  errorMessage = '';
  registrationMessage = '';

  constructor(private jwt: JwtService, private router: Router) { }

  ngOnInit(): void {
      this.isLoggedIn = this.jwt.isLoggedIn;
      this.registrationMessage = this.jwt.registrationMessage;
  }

  onSubmit() {
    localStorage.removeItem('access_token');
    this.jwt.login(this.form).subscribe((res: any) => {
      this.jwt.saveToken(res);
      this.isLoggedIn = true;
      this.jwt.getUserProfile().subscribe(user => localStorage.setItem('current_user', JSON.stringify(user)));
      this.errorMessage = '';
      this.jwt.registrationMessage = '';
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    },
      error => {
      this.errorMessage = error.error.message;
      if (error) {
        this.isLoggedIn = false;
      }
    });
  }

  getCurrentUsername(): string {
    return localStorage.getItem('user_username');
  }

}
