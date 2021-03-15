import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';

@Injectable({
    providedIn: 'root',
})
export class AuthContextService {

  isAuth: boolean = true;

  user: string = "";
    constructor(public rt: Router) {}

  emitUser() {
    //this.app.user = this.user
  }

  getLocalUser() {
   // let user = this.app.user;
   // return user;
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
