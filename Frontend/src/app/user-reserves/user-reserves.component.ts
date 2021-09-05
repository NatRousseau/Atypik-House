import { Component, OnInit } from '@angular/core';
import { Reserve } from '../models/Reserve/Reserve';
import { ReserveReceive } from '../models/Reserve/ReserveReceive';
import { ReserveService } from '../_services/Reserve/reserve.service';

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

    constructor(private rs: ReserveService) {}

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
}
