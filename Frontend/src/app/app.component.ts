import { Component, OnInit } from '@angular/core';
import { StatusUser } from './_services/User/statusUser';
import { UserService } from './_services/User/user.service';
import { Router, NavigationEnd } from '@angular/router';

declare let gtag: Function;

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
    title = 'atypikhouse';

    constructor(
        private auth: UserService,
        private statusUser: StatusUser,
        public router: Router
    ) {
        this.router.events.subscribe((event) => {
            if (event instanceof NavigationEnd) {
                gtag('config', 'G-E4Z4HHQCSC', {
                    page_path: event.urlAfterRedirects,
                });
            }
        });
    }

    ngOnInit(): void {
        this.statusUser.isAuth = false;
        if (
            localStorage.getItem('refresh_token') !== undefined ||
            localStorage.getItem('refresh_token').length > 0
        ) {
            this.auth.refresh().then((response) => {
                if (response.error !== undefined && response.error.length > 0) {
                    this.auth.disconnectUser();
                } else {
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem(
                        'refresh_token',
                        response.refresh_token
                    );
                    this.statusUser.isAuth = true;
                    if (response.rol_id === 1) {
                        this.statusUser.isAdmin = true;
                    }
                }
            });
        }
    }
}
