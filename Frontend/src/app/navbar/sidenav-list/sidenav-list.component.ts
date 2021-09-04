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
    constructor(public auth: UserService, public statusUser: StatusUser) {}

    @Output() sidenavClose = new EventEmitter();

    ngOnInit(): void {
        console.log('Navbar !!', this.auth.isAuth);
    }

    public onSidenavClose = () => {
        this.sidenavClose.emit();
    }

    disconnect() {
        this.auth.disconnectUser();
    }
}
