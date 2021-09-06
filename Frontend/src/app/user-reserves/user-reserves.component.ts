import { Component, OnInit } from '@angular/core';
import { Reserve } from '../models/Reserve/Reserve';
import { ReserveReceive } from '../models/Reserve/ReserveReceive';
import { ReserveService } from '../_services/Reserve/reserve.service';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CancelReserve } from '../models/Reserve/CancelReserve';

@Component({
    selector: 'app-user-reserves',
    templateUrl: './user-reserves.component.html',
    styleUrls: ['./user-reserves.component.scss'],
})
export class UserReservesComponent implements OnInit {
    listReserves: ReserveReceive[];
    noReserves: boolean = false;
    id: string = localStorage.getItem('usr_id');
    mail: string = localStorage.getItem('usr_mail');
    dateStart: string;
    dateEnd: string;

    constructor(
        private rs: ReserveService,
        public dialog: MatDialog,
        private rt: Router
    ) {}

    ngOnInit(): void {
        this.rs.getUserReserve(this.id, this.mail).then((reserves) => {
            this.listReserves = reserves.userReserve;
            if (reserves.userReserve.length === 0) {
                this.noReserves = true;
            } else {
                for (let i = 0; i < this.listReserves.length; i++) {
                    this.listReserves[i].res_date_start_formated =
                        this.getFormattedDate(
                            this.listReserves[i].res_date_start
                        );
                    this.listReserves[i].res_date_end_formated =
                        this.getFormattedDate(
                            this.listReserves[i].res_date_end
                        );
                }
            }
        });
    }

    getFormattedDate(dateReceive: Date) {
        let date = new Date(dateReceive);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return '' + day + '-' + month + '-' + year;
    }

    deleteReserve(index) {
        let message =
            'Voulez-vous vraiment annuler la réservation du locataire ?';
        let resultat = window.confirm(message);
        if (resultat) {
            let dateEnd: Date;
            let dateStart: Date;
            let cancelReserve: CancelReserve = {
                res_id: this.listReserves[index].res_id,
                res_adv_id: this.listReserves[index].res_adv_id,
                res_date_end: dateEnd,
                res_date_start: dateStart,
                res_usr_id: Number(localStorage.getItem('usr_id')),
            };
            this.rs
                .deleteReserve(cancelReserve)
                .then(() => this.rt.navigate(['/profil']));
        }
    }
}
