import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Advert} from '../models/Adverts/Advert';
import {Activity} from "../models/Activity/Activity";
import {AdvertsService} from '../_services/Adverts/adverts.service';
import {StatusUser} from '../_services/User/statusUser';
import {ActivityService} from "../_services/Activity/activity.service";
import {Commentary} from "../models/Commentary/Commentary";
import {CommentaryService} from "../_services/Commentary/commentary.service";
import {AdvertSet} from "../models/Adverts/AdvertSet";
import {CommentarySet} from "../models/Commentary/CommentarySet";
import {SnackBarService} from "../_services/SnackBar/snack-bar.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
    selector: 'app-details-announcement',
    templateUrl: './details-announcement.component.html',
    styleUrls: ['./details-announcement.component.scss'],
})
export class DetailsAnnouncementComponent implements OnInit {
    id: string;
    advert: Advert;
    listActivity: Activity[];
    listCommentary: Commentary[];
    mailVisible: boolean = false;
    phoneVisible: boolean = false;
    notOwner: boolean = true;
    usr_id: number;
    usr_firstName: string;
    usr_lastName: string;
    NewCommentary: FormGroup;

    constructor(
        private route: ActivatedRoute,
        private rt: Router,
        private fB: FormBuilder,
        private snackbar: SnackBarService,
        private adv: AdvertsService,
        private act: ActivityService,
        private com: CommentaryService,
        public statusUser: StatusUser
    ) {
    }

    ngOnInit(): void {
        this.initForm();
        this.id = this.route.snapshot.paramMap.get('id');
        this.usr_id = Number(localStorage.getItem('usr_id'));
        this.usr_firstName = localStorage.getItem('usr_firstName');
        this.usr_lastName = localStorage.getItem('usr_lastName');
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

        this.com.getCommentaryByAdvert(Number(this.id)).then((data) => {
            this.listCommentary = data.selectedCommentary;
        });
    }

    initForm() {
        this.NewCommentary = this.fB.group({
            content: ['', [Validators.required]],
        });
    }

    onSubmit(NewCommentaryFormData) {
        const commentarySet: CommentarySet = {
            com_text: NewCommentaryFormData.content,
            com_adv_id: Number(this.id),
            com_usr_id: this.usr_id,
            com_usr_firstName: this.usr_firstName,
            com_usr_lastName: this.usr_lastName,
        };
        this.snackbar.openSnackBar('Sauvegarde en cours ...', 'ok', 1500);

        this.com.createCommentary(commentarySet).then((result) => {
            if (result.error !== undefined && result.error.length > 0) {
                this.snackbar.openSnackBar(result.error, 'ok', 1500);
            } else {
                this.com.getCommentaryByAdvert(Number(this.id)).then((data) => {
                    this.listCommentary = data.selectedCommentary;
                });
                this.snackbar.openSnackBar('Commentaire sauvegardé', 'ok', 1500);
            }
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
