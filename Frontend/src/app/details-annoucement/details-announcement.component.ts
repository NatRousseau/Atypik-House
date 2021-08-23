import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advert } from '../models/Adverts/Advert';
import { AdvertsService } from '../_services/Adverts/adverts.service';
import { StatusUser } from '../_services/User/statusUser';

@Component({
    selector: 'app-details-announcement',
    templateUrl: './details-announcement.component.html',
    styleUrls: ['./details-announcement.component.scss'],
})
export class DetailsAnnouncementComponent implements OnInit {
    id: string;
    advert: Advert;
    mailVisible: boolean = false;
    phoneVisible: boolean = false;
    constructor(
        private route: ActivatedRoute,
        private rt: Router,
        private adv: AdvertsService,
        public statusUser: StatusUser
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.adv.getAdverById(Number(this.id)).then((data) => {
            this.advert = data.selectedAdvert;
            console.log(this.advert);
        });
    }

    back() {
        this.rt.navigate(['/search']);
    }
    setMailVisible() {
        this.mailVisible = true;
    }
    setPhoneVisible() {
        this.phoneVisible = true;
    }
}
