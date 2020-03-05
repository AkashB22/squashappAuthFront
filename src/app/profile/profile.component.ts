import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';

import {UserService} from './../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  userMail: string;
  userMobile: string;

  ngOnInit() {
    this.userService.getProfile()
      .subscribe(
        response=>{
          console.log(response);
          let user = response['user'];
          this.userMail = user['email'];
          this.userMobile = user['phone'];
        },
        error=>{
          this.router.navigateByUrl('/signin');
        }
      )
  }

}
