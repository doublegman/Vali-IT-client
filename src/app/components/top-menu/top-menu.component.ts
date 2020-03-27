import { Component, OnInit } from '@angular/core';
import {JwtService} from '../../services/jwt.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styleUrls: ['./top-menu.component.css']
})
export class TopMenuComponent implements OnInit {

  hm: boolean;
  isLoggedIn = false;

  constructor(private jwt: JwtService, private router: Router) { }

  ngOnInit(): void {
    this.hm = localStorage.getItem('user_id') !== null;
    this.isLoggedIn = this.jwt.isLoggedIn;
  }

  async logout(): Promise<void> {
    this.jwt.doLogout();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    });
  }

  public localStorageItem(key: string): string {
    return localStorage.getItem(key);
  }

}
