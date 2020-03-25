import { Component, OnInit } from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {Login} from '../../models/login';
import {User} from '../../models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  user: User;

  constructor(private jwt: JwtService) { }

  ngOnInit(): void {
  }

  onSubmit(username, password) {
    console.log('Enters to onSubmit method with ' + username.value + ' ' + password.value);
    this.jwt.login(new Login(username.value, password.value));
    this.jwt.getUserProfile().subscribe((user: User) => {
      this.user = user;
    });
    console.log(localStorage.getItem('access_token'));
  }
}
