import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-new-annoucement',
  templateUrl: './new-annoucement.component.html',
  styleUrls: ['./new-annoucement.component.scss']
})
export class NewAnnoucementComponent implements OnInit {

  registerForm: FormGroup;
  constructor( private fB: FormBuilder) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.registerForm = this.fB.group(
      {
        titre: ['', [Validators.required]],
        type: ['', [Validators.required]],
        max: ['', [Validators.required]],
        dispo: ['', [Validators.required]],
        
      })
  }
}
