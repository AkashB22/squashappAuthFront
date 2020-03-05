import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Subject} from 'rxjs';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }

  userUrl = `http://localhost:3000/users`;
  isAuth = false;
  authStatusListener = new Subject<any>();
  signupStatusListener = new Subject<any>();
  signinStatusListener = new Subject<any>();
  
  getAuthStatusListener(){
    return this.authStatusListener.asObservable();
  }

  getSignupStatusListener(){
    return this.signupStatusListener.asObservable();
  }

  getSigninStatusListener(){
    return this.signinStatusListener.asObservable();
  }

  signupUser(payload){
    this.http.post(`${this.userUrl}/signup`, payload)
      .subscribe(
        response=>{
          this.isAuth = true;
          this.authStatusListener.next(true);
          this.setToken(response['token']);
          this.router.navigateByUrl('/profile');
        },
        error=>{
          this.isAuth = false;
          this.authStatusListener.next(false);
          this.signupStatusListener.next(error);
        }
      )
  }

  signinUser(payload){
    this.http.post(`${this.userUrl}/signin`, payload)
      .subscribe(
        response=>{
          this.isAuth = true;
          this.authStatusListener.next(true);
          this.setToken(response['token']);
          this.router.navigateByUrl('/profile');
        },
        error=>{
          this.isAuth = false;
          this.authStatusListener.next(false);
          this.signinStatusListener.next(error);
        }
      )
  }

  getResetCheck(payload){
    return this.http.post(`${this.userUrl}/resetcheck`, payload);
  }

  getResetPassword(payload){
    return this.http.put(`${this.userUrl}/resetpassword`, payload);
  }

  getProfile(){
    let token = this.getToken();
    let httpOptions = {
      headers: new HttpHeaders({
        'Authorization' : `Bearer ${this.getToken()}`
      })
    }
    return this.http.get(`${this.userUrl}/profile`, httpOptions);
  }
  
  logout(){
    this.deleteToken();
    this.authStatusListener.next(false);
    this.router.navigateByUrl('/signin');
  }

  private setToken(token){
    localStorage.setItem('token', token);
  }

  private getToken(){
    return localStorage.getItem('token');
  }

  private deleteToken(){
    localStorage.removeItem('token');
  }
}
