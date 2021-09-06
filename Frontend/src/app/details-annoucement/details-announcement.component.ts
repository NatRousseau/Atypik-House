import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Advert } from '../models/Adverts/Advert';
import { Activity } from "../models/Activity/Activity";
import { AdvertsService } from '../_services/Adverts/adverts.service';
import { StatusUser } from '../_services/User/statusUser';
import {ActivityService} from "../_services/Activity/activity.service";

@Component({
    selector: 'app-details-announcement',
    templateUrl: './details-announcement.component.html',
    styleUrls: ['./details-announcement.component.scss'],
})
export class DetailsAnnouncementComponent implements OnInit {
    id: string;
    advert: Advert;
    listActivity: Activity[];
    mailVisible: boolean = false;
    phoneVisible: boolean = false;
    notOwner: boolean = true;
    constructor(
        private route: ActivatedRoute,
        private rt: Router,
        private adv: AdvertsService,
        private act: ActivityService,
        public statusUser: StatusUser
    ) {}

    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
        this.adv.getAdverById(Number(this.id)).then((data) => {
            this.advert = data.selectedAdvert;

            let advUsrId: number = Number(this.advert[0].adv_usr_id);
            let usrId: number = Number(localStorage.getItem('usr_id'));

            if (advUsrId === usrId) {
                this.notOwner = false;
            }
        });
        this.act.getActivityById(Number(this.id)).then((data) => {
            this.listActivity = data.selectedActivity;
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
