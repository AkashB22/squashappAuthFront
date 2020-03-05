import { Component } from '@angular/core';

import {UserService} from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'client';
  isUserValid = false;

  constructor(private userService: UserService){
    this.userService.getAuthStatusListener()
      .subscribe(
        response=>{
          this.isUserValid = response;
        }
      )
  }

  onLogout(e){
    this.userService.logout();
  }
}
