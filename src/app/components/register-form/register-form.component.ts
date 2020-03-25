import { Component, OnInit } from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {User} from '../../models/user';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {

  form: any = {};

  constructor(private jwt: JwtService) { }

  ngOnInit(): void {
  }

  onSubmit() {
    const user = new User(
      this.form.username,
      this.form.password,
      this.form.email,
      this.form.firstName,
      this.form.lastName,
      this.form.gender,
      null);

    this.jwt.register(user);
  }
}
