import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CancelReserve } from '../models/Reserve/CancelReserve';
import { ReserveReceive } from '../models/Reserve/ReserveReceive';
import { AdvertsService } from '../_services/Adverts/adverts.service';
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
    constructor(
        private rs: ReserveService,
        private route: ActivatedRoute,
        private rt: Router,
        private adv: AdvertsService
    ) {}
    ngOnInit(): void {
        this.advId = this.route.snapshot.paramMap.get('adv');
        this.adv.getAdverById(Number(this.advId)).then((data) => {
            if (
                Number(data.selectedAdvert[0].adv_usr_id) !== Number(this.usrId)
            ) {
                this.rt.navigate(['/home']);
            }
        });
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

    deleteReserve(index) {
        let message = 'Voulez-vous vraiment annuler votre réservation ?';
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
