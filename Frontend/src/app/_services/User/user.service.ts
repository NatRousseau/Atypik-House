import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LogUSer } from 'src/app/models/Users/LogUser';
import { User } from 'src/app/models/Users/User';
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

  /* register(user) {
     const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        mail: user.mail,
        password: user.password
      }),
    };

   fetch(environment.API_URL + `/register`,requestOptions)
  } */

  async connectUser(user:LogUSer) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body : JSON.stringify({
        usr_mail : user.usr_mail,
        user_password: user.usr_password
      })
    };

   const response =  await fetch(environment.API_URL + "/login", requestOptions);
   const data =  await response.json();
   return data;
  }

  disconnectUser() {
    localStorage.setItem("User", "");
    this.rt.navigate(["/"]);
  }
}
