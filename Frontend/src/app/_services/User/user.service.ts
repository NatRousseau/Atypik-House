import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { LogUSer } from 'src/app/models/Users/LogUser';
import { NewUser } from 'src/app/models/Users/NewUser';
import { User } from 'src/app/models/Users/User';
import { environment } from 'src/environments/environment';
import { StatusUser } from './statusUser';

@Injectable({ providedIn: 'root' })
export class UserService {
    isAuth: boolean = true;

    constructor(
        public rt: Router,
        private http: HttpClient,
        private statusUser: StatusUser
    ) {}

    emitUser() {
        //this.app.user = this.user
    }

    getLocalUser() {
        // let user = this.app.user;
        // return user;
    }

    async register(user: NewUser) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                usr_mail: user.usr_mail,
                usr_password: user.usr_password,
                usr_phone: '' + user.usr_phone,
                usr_firstName: user.usr_firstName,
                usr_lastName: user.usr_lastName,
            }),
        };

        const response = await fetch(
            environment.API_URL + `/register`,
            requestOptions
        );

        const data = await response.json();
        return data;
    }

    async connectUser(user: LogUSer) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },

            body: JSON.stringify({
                usr_mail: user.usr_mail,
                usr_password: user.usr_password,
            }),
        };

        const response = await fetch(
            environment.API_URL + '/login',
            requestOptions
        );
        const data = await response.json();
        return data;
    }

    async disconnectUser() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },

            body: JSON.stringify({
                usr_refresh_token: localStorage.getItem('refresh_token'),
            }),
        };

        await fetch(environment.API_URL + '/logout', requestOptions);
        localStorage.clear();
        this.statusUser.isAuth = false;
        this.rt.navigate(['/']);
    }

    async refresh() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },

            body: JSON.stringify({
                usr_refresh_token: localStorage.getItem('refresh_token'),
            }),
        };
        const response = await fetch(
            environment.API_URL + '/refresh',
            requestOptions
        );
        const data = await response.json();
        return data;
    }
}
