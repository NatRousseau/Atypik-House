import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import { userService } from '../_services/User/user.service';


@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class connectionComponent implements OnInit {
  hide = true;
  isAuth: Boolean;
  signInForm: FormGroup;
  errorMessage: string;
  constructor(private fB: FormBuilder , public auth: userService ) { }

  ngOnInit(): void {
    this.initForm();
   // console.log(this.h.user);
  }

  initForm() {
    this.signInForm = this.fB.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      })
      
  }

  
  onSubmit() {
    const email = this.signInForm.get('email').value;
    const password = this.signInForm.get('password').value
    console.log(email,password)
    this.isAuth = true;
    //this.auth.user = email + " " + password;
    this.auth.connectUser(email, password);

  }

  disconnect() {
    this.auth.disconnectUser();
  }
}
