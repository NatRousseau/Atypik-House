import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Advert } from '../models/Adverts/Advert';
import { AdvertSet } from '../models/Adverts/AdvertSet';
import { AdvertsService } from '../_services/Adverts/adverts.service';
import { SnackBarService } from '../_services/SnackBar/snack-bar.service';

@Component({
    selector: 'app-update-advert',
    templateUrl: './update-advert.component.html',
    styleUrls: ['./update-advert.component.scss'],
})
export class UpdateAdvertComponent implements OnInit {
    updateAdvertForm: FormGroup;
    advert: Advert;
    usrId: string;
    constructor(
        private fB: FormBuilder,
        private advService: AdvertsService,
        private snackbar: SnackBarService,
        private rt: Router,
        private route: ActivatedRoute
    ) {}

    ngOnInit(): void {
        let id = this.route.snapshot.paramMap.get('id');
        this.usrId = localStorage.getItem('usr_id');
        this.advService.getAdverById(Number(id)).then((data) => {
            this.advert = data.selectedAdvert;
            if (
                Number(data.selectedAdvert[0].adv_usr_id) !== Number(this.usrId)
            ) {
                this.rt.navigate(['/home']);
            }
        });
        this.initForm();
    }

    initForm() {
        this.updateAdvertForm = this.fB.group({
            titre: ['', [Validators.required]],
            type: ['', [Validators.required]],
            max: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
            adress: ['', [Validators.required]],
            city: ['', [Validators.required]],
            adv_postal: [
                '',
                [Validators.required, Validators.pattern(/[0-9]{5}/)],
            ],
            adv_price: ['', [Validators.required]],
            dispo: [false],
            describe: ['', [Validators.required]],
        });
    }

    onSubmit(updateAdvertUserFormData) {
        const advert: AdvertSet = {
            adv_name: updateAdvertUserFormData.titre,
            adv_type: updateAdvertUserFormData.type,
            adv_tenants: updateAdvertUserFormData.max,
            adv_status: updateAdvertUserFormData.dispo,
            adv_adress: updateAdvertUserFormData.adress,
            adv_city: updateAdvertUserFormData.city,
            adv_postal: updateAdvertUserFormData.adv_postal,
            adv_price: updateAdvertUserFormData.adv_price,
            adv_usr_id: Number(localStorage.getItem('usr_id')),
            adv_usr_mail: localStorage.getItem('usr_mail'),
            adv_usr_phone: localStorage.getItem('usr_phone'),
            adv_describe: updateAdvertUserFormData.describe,
        };
        this.snackbar.openSnackBar('Sauvegarde en cours ...', 'ok', 1500);

        this.advService.postAdvert(advert).then((result) => {
            if (result.error !== undefined && result.error.length > 0) {
                this.snackbar.openSnackBar(result.error, 'ok', 1500);
            } else {
                this.snackbar.openSnackBar(
                    'Modification sauvegardé',
                    'ok',
                    1500
                );
                this.rt.navigate(['/profil']);
            }
        });
    }
}
