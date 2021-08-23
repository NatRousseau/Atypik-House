import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AdvertsService } from '../_services/Adverts/adverts.service';
import { ReserveService } from '../_services/Reserve/reserve.service';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
    selector: 'app-reserve',
    templateUrl: './reserve.component.html',
    styleUrls: ['./reserve.component.scss'],
})
export class ReserveComponent implements OnInit {
    id: string;
    campaignOne: FormGroup;
    campaignTwo: FormGroup;
    constructor(
        private route: ActivatedRoute,
        private rt: Router,
        private adv: AdvertsService,
        private res: ReserveService
    ) {
        const today = new Date();
        const month = today.getMonth();
        const year = today.getFullYear();

        this.campaignOne = new FormGroup({
            start: new FormControl(new Date(year, month, 13)),
            end: new FormControl(new Date(year, month, 16)),
        });

        this.campaignTwo = new FormGroup({
            start: new FormControl(new Date(year, month, 15)),
            end: new FormControl(new Date(year, month, 19)),
        });
    }

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
    }
}
