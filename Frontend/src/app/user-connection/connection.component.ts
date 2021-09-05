import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { LogUSer } from '../models/Users/LogUser';
import { StatusUser } from '../_services/User/statusUser';

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
    errorWhenLogin = false;
    constructor(
        private fB: FormBuilder,
        public auth: UserService,
        private rt: Router,
        private statusUser: StatusUser
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.registerForm = this.fB.group({
            email: ['', [Validators.required, Validators.email]],
            password: [
                '',
                [Validators.required, Validators.pattern(/[0-9a-zA-Z]{4,}/)],
            ],
        });
    }

    onSubmit(registerForm) {
        const user: LogUSer = {
            usr_mail: registerForm.email,
            usr_password: registerForm.password,
        };
        this.auth.connectUser(user).then((userLog) => {
            if (userLog.error === undefined) {
                localStorage.setItem('usr_mail', userLog.usr_mail);
                localStorage.setItem('usr_phone', userLog.usr_phone);
                localStorage.setItem('usr_id', userLog.usr_id);
                localStorage.setItem('usr_firstName', userLog.usr_firstName);
                localStorage.setItem('usr_lastName', userLog.usr_lastName);
                localStorage.setItem('access_token', userLog.access_token);
                localStorage.setItem('refresh_token', userLog.refresh_token);
                this.isAuth = true;
                this.statusUser.isAuth = true;
                this.rt.navigate(['/']);
            } else if (userLog.error.length > 0) {
                this.errorWhenLogin = true;
            }
        });
    }

    disconnect() {
        this.auth.disconnectUser();
    }
}
