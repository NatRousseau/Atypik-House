import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({ providedIn: 'root'})
export class UserService {

  isAuth: boolean = true;

    constructor(
      public rt: Router,
      private http: HttpClient
      ) {}

  emitUser() {
    //this.app.user = this.user
  }

  getLocalUser() {
   // let user = this.app.user;
   // return user;
  }

  register(user): Observable<any> {
    console.log(user.mail);
    
    return this.http.post(environment.API_URL + `/register`, user);
  }

  connectUser(email:string,password:string) {
    let user = email + password;
    localStorage.setItem("User",user);
    this.rt.navigate(["/"]);
  }

  disconnectUser() {
    localStorage.setItem("User", "");
    this.rt.navigate(["/"]);
  }
}
