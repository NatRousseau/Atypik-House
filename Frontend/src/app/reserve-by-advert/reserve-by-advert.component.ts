import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReserveReceive } from '../models/Reserve/ReserveReceive';
import { ReserveService } from '../_services/Reserve/reserve.service';

@Component({
    selector: 'app-reserve-by-advert',
    templateUrl: './reserve-by-advert.component.html',
    styleUrls: ['./reserve-by-advert.component.scss'],
})
export class ReserveByAdvertComponent implements OnInit {
    listReserves: ReserveReceive[];
    noReserves: boolean = false;
    usrId: string = localStorage.getItem('usr_id');
    advId: string;
    advName: string;
    dateStart: string;
    dateEnd: string;
    constructor(private rs: ReserveService, private route: ActivatedRoute) {}
    ngOnInit(): void {
        this.advId = this.route.snapshot.paramMap.get('adv');
        this.rs.getReservebyAdvert(this.advId, this.usrId).then((reserves) => {
            this.listReserves = reserves.userReserve;
            this.advName = this.listReserves[0].res_adv_name;
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
