import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, Validators, FormGroup} from '@angular/forms';
import {Subscription} from 'rxjs';
import {Router} from '@angular/router';

import {UserService} from './../user.service';

@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.css']
})
export class ResetpasswordComponent implements OnInit {

  constructor(private fb : FormBuilder, private userService: UserService, private router: Router) { }

  resetCheckForm : FormGroup;
  resetPasswordForm : FormGroup;
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
  isValidUser: boolean = false;
  resetPassword: string;
  resetPasswordMsg: string;

  ngOnInit() {
    this.resetCheckForm = this.fb.group({
      email: new FormControl('', [Validators.email, Validators.minLength(6), Validators.required]),
      phone: new FormControl('', [Validators.minLength(10), Validators.maxLength(30), Validators.required])
    });
  }

  onResetCheckSubmit(e){
    console.log(this.resetCheckForm.value);
    this.userService.getResetCheck(this.resetCheckForm.value)
      .subscribe(
        response=>{
          this.isValidUser = true;
          console.log(response);
        },
        error=>{
          console.log(error);
        }
      );
  }

  onResetPasswordSubmit(e){
    console.log(this.resetPassword);
    if(this.resetPassword.length < 6){
      this.resetPasswordMsg = "password is required and needs 6 characters minimum";
    } else{
      let payload = {
        email: this.resetCheckForm.value.email,
        phone: this.resetCheckForm.value.phone,
        password: this.resetPassword
      }
      this.userService.getResetPassword(payload)
      .subscribe(
        response=>{
          console.log(response);
          this.router.navigateByUrl('/profile');
        },
        error=>{
          console.log(error);
        }
      );
    }
    
  }

}
