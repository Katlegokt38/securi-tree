import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  authToken : any;
  user: any;

  constructor(private http: HttpClient) { }

  //For logggin user in
  authenticateUser(user:any){
    let headers = new HttpHeaders();
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('users/authenticate', user, {headers: headers})
          .pipe(map(res => res));
  }

  getProfile(){
    this.loadUser();
    return(this.user);
  }

  updateDoor(door:any){
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.post('systems/update', door, {headers: headers})
          .pipe(map(res => res));
  }

  storeUserData(token:any, user:any){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  //Function to fetch token from local storage
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  loadUser(){
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    this.user = user;
  }

  loggedIn(){
    const helper = new JwtHelperService();
    const isExpired = helper.isTokenExpired(this.authToken);
    return isExpired;
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

  //System Functions
  getTree(){
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get('systems/tree', {headers: headers})
          .pipe(map(res => res));
  }

  getDoors(){
    let headers = new HttpHeaders();
    this.loadToken();
    headers = headers = headers.append('Authorization', this.authToken);
    headers = headers.append('Content-Type', 'application/json');
    return this.http.get('systems/door', {headers: headers})
          .pipe(map(res => res));
  }
}
