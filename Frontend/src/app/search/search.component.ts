import { Component, OnInit } from '@angular/core';
import { Advert } from '../models/Adverts/Advert';
import { AdvertsService } from '../_services/Adverts/adverts.service';
import { StatusUser } from '../_services/User/statusUser';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    listAdverts: Advert[];

    constructor(
        public statusUser: StatusUser,
        private advService: AdvertsService
    ) {}

    ngOnInit(): void {
        this.advService.getAdvertsByTimestamp().then((adverts) => {
            this.listAdverts = adverts.advertByTimestamp;
        });
    }

    onclick() {
        console.log(this.listAdverts);
    }
}
