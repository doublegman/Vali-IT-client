import { Component, OnInit } from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  form: any = {};
  errorMessage = '';

  constructor(private jwt: JwtService, private router: Router) { }

  ngOnInit(): void {
    this.form.gender = true;
  }

  onaSubmit() {
    this.jwt.register(this.form).subscribe(
      (res: any) => {
        this.jwt.registrationMessage = 'Successfully registered. Please log in.';
          this.router.navigate(['/login']).then();
      }, error => {
        if (error) {
          this.errorMessage = error.error.message;
          console.log(this.errorMessage);
        }
      }
    );
  }

}
