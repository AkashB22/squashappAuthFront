import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

import {UserService} from './../user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {

  constructor(private fb : FormBuilder, private userService: UserService) { }

  signinForm : FormGroup;
  error_messages = {
    'email' : [
      {type: 'required', message : 'email is required'},
      {type: 'minlength', message : 'email must have a minimum of 6 characters'},
      {type: 'email', message: 'not a valid email'}
    ],
    'password' : [
      {type: 'required', message : 'password is required'},
      {type: 'minlength', message : 'password must have a minimum of 6 characters'}
    ]
  }

  serverErrorResponse: String;

  signinStatusListenerSub: Subscription;

  ngOnInit() {
    this.signinForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.minLength(6), Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    });

    this.signinStatusListenerSub = this.userService.getSigninStatusListener()
      .subscribe(error=>{
      console.log(error);
      this.serverErrorResponse = error['error']['info'];
    })
  }

  ngOnDestroy(){
    this.signinStatusListenerSub.unsubscribe();
  }

  onSubmit(e){
    console.log(this.signinForm.value);
    this.userService.signinUser(this.signinForm.value);
  }
}
