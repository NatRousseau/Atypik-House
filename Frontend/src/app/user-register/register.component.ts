import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SnackBarService } from '../_services/SnackBar/snack-bar.service';
import { UserService } from '../_services/User/user.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class registerComponent implements OnInit {

  hide = true;

  registerForm: FormGroup;
  errorMessage: string;
  constructor(
    private fB: FormBuilder,
    private snackbar: SnackBarService,
    private userService: UserService,
    ) { }

  private _onError(error) {
    console.error(error);
  }
  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.registerForm = this.fB.group(
      {
        mail: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{4,}/)]]
      })
  }

  get mail(){
    return this.registerForm.get('mail')
  }
  get password(){
    return this.registerForm.get('password')
  }

  onSubmit(registerUserFormData) {

    const user = {
			mail: registerUserFormData.mail,
			password: registerUserFormData.password
		};

    this.snackbar.openSnackBar('Sauvegarde en cours ...', 'ok', 1500);

    this.userService.register(user).subscribe(
      result => {
				if (result) {
          this.snackbar.openSnackBar('Utilisateur sauvegardé.', 'ok', 1500);
				}
				else this._onError
			},
			this._onError
		);
 


  }
}
