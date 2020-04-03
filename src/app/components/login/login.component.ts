import {Component, OnInit} from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';

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

  constructor(
    private jwt: JwtService,
    private router: Router,
    private cookieService: CookieService
  ) {
  }

  ngOnInit(): void {
    this.isLoggedIn = this.jwt.isLoggedIn;
    this.registrationMessage = this.jwt.registrationMessage;
    if (this.cookieService.get('remember')) {
      this.form.username = this.cookieService.get('username');
      this.form.password = this.cookieService.get('password');
      this.form.rememberme = this.cookieService.get('remember');
    }
  }

  onSubmit() {
    console.log(this.form.rememberme);
    localStorage.removeItem('access_token');
    this.jwt.login(this.form).subscribe((res: any) => {
        this.jwt.saveToken(res);
        this.isLoggedIn = true;
        this.jwt.getUserProfile().subscribe(user => localStorage.setItem('current_user', JSON.stringify(user)));
        this.errorMessage = '';
        this.jwt.registrationMessage = '';
        if(this.form.rememberme) {
          this.cookieService.set('username', this.form.username);
          this.cookieService.set('password', this.form.password);
          this.cookieService.set('remember', this.form.rememberme);
        } else {
          this.cookieService.deleteAll();
        }
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
