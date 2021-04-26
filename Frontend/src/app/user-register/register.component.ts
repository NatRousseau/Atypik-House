import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class IregisterComponent implements OnInit {

  hide = true;

  signInForm: FormGroup;
  errorMessage: string;
  constructor(private fB: FormBuilder ) { }

  ngOnInit(): void {
    this.initForm();
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
  }
}
