import { Component, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user';
import {JwtService} from '../../services/jwt.service';
import {Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import Swal from "sweetalert2";

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
  image: File;
  profilePictureUrl = '';

  constructor(
    private jwt: JwtService,
    private userService: UserService,
    private router: Router,
    private http: HttpClient
  ) { }

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
    if (this.image) {
      const api = `${this.jwt.endpoint}/uploadImage`;
      let tempImage = new FormData();
      tempImage.append('file', this.image);
      this.http.post(api, tempImage).subscribe((res: any) => {
        this.userForm.profilePictureUrl = res.imageUrl;
        this.updateUser();
      });
      return;
    } else {
      this.updateUser();
    }
  }

  fileChange(event: any) {
    if (event.target.files && event.target.files.length > 0) {
      this.image = event.target.files[0];
    }
  }

  updateUser() {
    this.userService.updateUserProfile(this.userForm).subscribe(
      async res => {
        this.user = res.user;
        this.errorMessage = '';
        await (20000);
        this.isUpdated = true;
        Swal.fire({
          position: 'center',
          icon: 'success',
          html: '<p class="h5 text-dark">Account has been updated</p>',
          showConfirmButton: false,
          timer: 1500
        }).then(() => {
        this.router.navigate(['/user']).then(() => {
          window.location.reload();
        });
        });
      }, error => {
        if (error) {
          this.errorMessage = error.error.message;
        }
      }
    );
  }

}
