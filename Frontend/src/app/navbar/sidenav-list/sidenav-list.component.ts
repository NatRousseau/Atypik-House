import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { SnackBarService } from '../../_services/SnackBar/snack-bar.service';
import { StatusUser } from '../../_services/User/statusUser';
import { UserService } from '../../_services/User/user.service';

@Component({
    selector: 'sidenav-list',
    templateUrl: './sidenav-list.component.html',
    styleUrls: ['./sidenav-list.component.scss'],
})
export class SidenavListComponent implements OnInit {
    user = localStorage.getItem('User');

    firstName: string = localStorage.getItem('usr_firstName');
    lastName: string = localStorage.getItem('usr_lastName');

    constructor(public auth: UserService, public statusUser: StatusUser) {}

    @Output() sidenavClose = new EventEmitter();

    ngOnInit(): void {}

    public onSidenavClose = () => {
        this.sidenavClose.emit();
    };

    disconnect() {
        this.auth.disconnectUser();
    }
}
