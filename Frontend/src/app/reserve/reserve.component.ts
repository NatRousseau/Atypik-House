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

    constructor(
        private route: ActivatedRoute,
        private fB: FormBuilder,
        private rt: Router,
        private adv: AdvertsService,
        private res: ReserveService
    ) {
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();
        const currentYear = new Date().getFullYear();

        this.minDate = new Date();
        this.maxDate = new Date(currentYear + 1, 11, 31);

        this.datesReserve = this.fB.group({
            start: [, [Validators.required]],
            end: [, [Validators.required]],
        });
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.adv.getAdverById(Number(this.id)).then((data) => {
            this.advert = data.selectedAdvert;
            console.log(this.advert);
        });
    }
    onSubmit(datesReserve) {
        console.log('Période choisi', datesReserve);
    }
}
