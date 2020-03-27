import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {JwtService} from '../../services/jwt.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  user: User = new User();
  userForm: User = new User();
  errorMessage ='';
  isUpdated = false;

  constructor(private jwt: JwtService, private userService: UserService, private router: Router) { }

  async ngOnInit(): Promise<void> {
    await this.jwt.getUserProfile().subscribe(user => {
      this.user = user;
    })
  }

  onSubmit() {
    this.userForm.id = Number(this.jwt.getId());
    if(!this.userForm.email) {
      this.userForm.email = this.user.email;
    }
    this.userService.updateUserProfile(this.userForm).subscribe(
      async res => {
        this.user = res.user;
        this.errorMessage = '';
        await (20000);
        this.isUpdated = true;
        this.router.navigate(['/user']).then(() => {
          window.setTimeout(function(){window.location.reload()}, 1000);
        });
      }, error => {
        if(error) {
          this.errorMessage = error.error.message;
        }
      }
    )
  }

}
