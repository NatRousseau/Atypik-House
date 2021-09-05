import { Component, OnInit } from '@angular/core';
import { Advert } from '../models/Adverts/Advert';
import { AdvertsService } from '../_services/Adverts/adverts.service';

@Component({
    selector: 'app-user-adverts',
    templateUrl: './user-adverts.component.html',
    styleUrls: ['./user-adverts.component.scss'],
})
export class UserAdvertsComponent implements OnInit {
    listAdverts: Advert[];
    noAdverts: boolean = false;
    id: string = localStorage.getItem('usr_id');
    constructor(private advService: AdvertsService) {}

    ngOnInit(): void {
        this.advService.getUserAdvert(this.id).then((adverts) => {
            this.listAdverts = adverts.userAdvert;
            if (adverts.userAdvert.length === 0) {
                this.noAdverts = true;
            }
        });
    }
}
