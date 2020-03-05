import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';

import {UserService} from './../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private fb : FormBuilder, private userService: UserService) { }

  signupForm : FormGroup;
  error_messages = {
    'email' : [
      {type: 'required', message : 'email is required'},
      {type: 'minlength', message : 'email must have a minimum of 6 characters'},
      {type: 'email', message: 'not a valid email'}
    ],
    'phone' : [
      {type: 'required', message : 'phone is required'},
      {type: 'minlength', message : 'phone must have a minimum of 10 characters'},
      {type: 'maxlength', message: 'phone must have only upto 30 characters'}
    ],
    'password' : [
      {type: 'required', message : 'password is required'},
      {type: 'minlength', message : 'password must have a minimum of 6 characters'}
    ]
  }

  serverErrorResponse: String;

  signupStatusListenerSub: Subscription;

  ngOnInit() {
    this.signupForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.minLength(6), Validators.required]),
      phone: new FormControl('', [Validators.minLength(10), Validators.maxLength(30), Validators.required]),
      password: new FormControl('', [Validators.minLength(6), Validators.required])
    });

    this.signupStatusListenerSub = this.userService.getSignupStatusListener()
      .subscribe(error=>{
      console.log(error);
      this.serverErrorResponse = error['error']['info'];
    })
  }

  ngOnDestroy(){
    this.signupStatusListenerSub.unsubscribe();
  }

  onSubmit(e){
    console.log(this.signupForm.value);
    this.userService.signupUser(this.signupForm.value);
  }

}
