import {Component, Input, OnInit, Output, EventEmitter} from '@angular/core';
import {SnackBarService} from '../_services/SnackBar/snack-bar.service';
import {StatusUser} from '../_services/User/statusUser';
import {UserService} from '../_services/User/user.service';

@Component({
    selector: 'navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {

    firstName: string = localStorage.getItem('usr_firstName');
    lastName: string = localStorage.getItem('usr_lastName');

    constructor(public auth: UserService, public statusUser: StatusUser) {
    }

    @Output() public sidenavToggle = new EventEmitter();

    ngOnInit(): void {}

    public onToggleSidenav = () => {
        this.sidenavToggle.emit();
    }

    disconnect() {
        this.auth.disconnectUser();
    }
}
