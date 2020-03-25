import { Component, OnInit } from '@angular/core';
import {JwtService} from '../../services/jwt.service';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  hm: boolean;

  constructor(private jwt: JwtService) { }

  ngOnInit(): void {
    this.hm = localStorage.getItem('user_id') !== null;
    console.log(this.hm);
  }

  logout(): void {
    this.jwt.doLogout();
  }

}
