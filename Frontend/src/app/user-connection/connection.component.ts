import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import {NavbarComponent} from '../navbar/navbar.component';
import { UserService } from '../_services/User/user.service';


@Component({
  selector: 'app-connection',
  templateUrl: './connection.component.html',
  styleUrls: ['./connection.component.scss']
})
export class connectionComponent implements OnInit {
  hide = true;
  isAuth: Boolean;
  registerForm: FormGroup;
  errorMessage: string;
  constructor(private fB: FormBuilder , public auth: UserService ) { }

  ngOnInit(): void {
    this.initForm();
   // console.log(this.h.user);
  }

  initForm() {
    this.registerForm = this.fB.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
      })
      
  }

  
  onSubmit() {
    const email = this.registerForm.get('email').value;
    const password = this.registerForm.get('password').value
    console.log(email,password)
    this.isAuth = true;
    //this.auth.user = email + " " + password;
    this.auth.connectUser(email, password);

  }

  disconnect() {
    this.auth.disconnectUser();
  }
}
