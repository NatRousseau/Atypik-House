import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LogUSer } from '../models/Users/LogUser';

import { UserService } from '../_services/User/user.service';

@Component({
    selector: 'app-connection',
    templateUrl: './connection.component.html',
    styleUrls: ['./connection.component.scss'],
})
export class connectionComponent implements OnInit {
    hide = true;
    isAuth: Boolean;
    registerForm: FormGroup;
    errorMessage: string;
    constructor(
        private fB: FormBuilder,
        public auth: UserService,
        private rt: Router
    ) {}

    ngOnInit(): void {
        this.initForm();
        // console.log(this.h.user);
    }

    initForm() {
        this.registerForm = this.fB.group({
            email: ['', [Validators.required, Validators.email]],
            password: [
                '',
                [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)],
            ],
        });
    }

    onSubmit(registerForm) {
        const user: LogUSer = {
            usr_mail: registerForm.email,
            usr_password: registerForm.password,
        };
        this.auth.connectUser(user).then((userLog) => {
          console.log(userLog);
           /*  if (userLog !== undefined) {
                localStorage.setItem('Mail', user.usr_mail);
                this.isAuth = true;
                this.rt.navigate(['/']);
            } */
        });

        //this.auth.user = email + " " + password;
    }

    disconnect() {
        this.auth.disconnectUser();
    }
}
