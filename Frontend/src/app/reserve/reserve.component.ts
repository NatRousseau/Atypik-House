import { Component, OnInit } from '@angular/core';
import {
    FormBuilder,
    FormControl,
    FormGroup,
    Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertsService } from '../_services/Adverts/adverts.service';
import { ReserveService } from '../_services/Reserve/reserve.service';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { Advert } from '../models/Adverts/Advert';
import { DatesReserve } from '../models/Reserve/datesReserve';
import { SnackBarService } from '../_services/SnackBar/snack-bar.service';
import { ReserveCreated } from '../_services/Reserve/reserveCreated';
import { Reserve } from '../models/Reserve/Reserve';
import { HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'app-reserve',
    templateUrl: './reserve.component.html',
    styleUrls: ['./reserve.component.scss'],
})
export class ReserveComponent implements OnInit {
    id: string;
    advert: Advert;
    datesReserve: FormGroup;
    minDate: Date;
    maxDate: Date;
    errorNbTenants: Boolean = false;
    datesReserved: DatesReserve[];
    datesErrors: boolean = false;
    dateRange1 = [new Date('08-26-2021'), new Date('08-28-2021')];
    dateRange2 = [new Date('01-09-2021'), new Date('09-09-2021')];
    constructor(
        private route: ActivatedRoute,
        private fB: FormBuilder,
        private rt: Router,
        private snackbar: SnackBarService,
        private adv: AdvertsService,
        private res: ReserveService,
        private resCreate: ReserveCreated
    ) {
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        const currentYear = new Date().getFullYear();

        this.minDate = new Date();
        this.maxDate = new Date(currentYear + 1, 11, 31);

        this.datesReserve = this.fB.group({
            nbTenants: [
                ,
                [Validators.required, Validators.pattern(/^[0-9]\d*$/)],
            ],
            start: [, [Validators.required]],
            end: [, [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.adv.getAdverById(Number(this.id)).then((data) => {
            this.advert = data.selectedAdvert;
        });
        this.res.getDatebyAdvRes(Number(this.id)).then((data) => {
            this.datesReserved = data.result;
        });
    }
    getFormattedDate(dateReceive: Date) {
        let date = new Date(dateReceive);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return new Date(month + '-' + day + '-' + year);
    }
    getFormattedDateForApi(dateReceive: Date) {
        let date = new Date(dateReceive);
        let year = date.getFullYear();
        let month = (1 + date.getMonth()).toString().padStart(2, '0');
        let day = date.getDate().toString().padStart(2, '0');

        return new Date(year + '-' + month + '-' + day);
    }

    myFilter = (d: Date | null): boolean => {
        if (this.datesReserved.length > 0) {
            for (let i = 0; i < this.datesReserved.length; i++) {
                if (
                    d >=
                        this.getFormattedDate(
                            this.datesReserved[i].res_date_start
                        ) &&
                    d <=
                        this.getFormattedDate(
                            this.datesReserved[i].res_date_end
                        )
                ) {
                    return false;
                }
            }
        }
        return true;
    };
    onChangeTenantsFields(datesReserve) {
        if (datesReserve.nbTenants > this.advert[0].adv_tenants) {
            this.errorNbTenants = true;
        } else {
            this.errorNbTenants = false;
        }
    }
    onSubmit(datesReserve) {
        let dateStartToCompare: Date;
        let dateEndToCompare: Date;

        for (let i = 0; i < this.datesReserved.length; i++) {
            dateStartToCompare = new Date(this.datesReserved[i].res_date_start);
            dateEndToCompare = new Date(this.datesReserved[i].res_date_end);
            if (
                datesReserve.start < dateStartToCompare &&
                datesReserve.end >= dateEndToCompare
            ) {
                this.datesErrors = true;
                this.snackbar.openSnackBar(
                    'Vous ne pouvez pas sélectionner une période réservée',
                    'ok',
                    1500
                );
            }
        }
        if (!this.datesErrors) {
            let dateStart: Date = new Date(
                this.getFormattedDateForApi(datesReserve.start)
            );
            let dateEnd: Date = new Date(
                this.getFormattedDateForApi(datesReserve.end)
            );
            let newReserve: Reserve = {
                res_adv_id: Number(this.advert[0].adv_id),
                res_adv_price: this.advert[0].adv_price,
                res_adv_tenants: datesReserve.nbTenants,
                res_adv_name: this.advert[0].adv_name,
                res_usr_mail: localStorage.getItem('usr_mail'),
                res_usr_phone: localStorage.getItem('usr_phone'),
                res_usr_id: Number(localStorage.getItem('usr_id')),
                res_date_start: dateStart,
                res_date_end: dateEnd,
            };
            this.resCreate.reserve = newReserve;
            this.rt.navigate(['/paiement/' + this.id]);
        }
    }
}
