import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-user-profil',
    templateUrl: './user-profil.component.html',
    styleUrls: ['./user-profil.component.scss'],
})
export class UserProfilComponent implements OnInit {
    firstName: string = localStorage.getItem('usr_firstName');
    lastName: string = localStorage.getItem('usr_lastName');
    mail: string = localStorage.getItem('usr_mail');
    reservesClicked: boolean = false;
    locationsClicked: boolean = false;
    galerieClicked: boolean = true;
    constructor() {}

    ngOnInit(): void {}

    changeReserveToolbar() {
        this.reservesClicked = true;
        this.locationsClicked = false;
        this.galerieClicked = false;
    }
    changeLocationsToolbar() {
        this.reservesClicked = false;
        this.locationsClicked = true;
        this.galerieClicked = false;
    }
    changeGalerieToolbar() {
        this.reservesClicked = false;
        this.locationsClicked = false;
        this.galerieClicked = true;
    }
}
