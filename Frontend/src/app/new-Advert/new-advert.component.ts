import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AdvertSet } from '../models/Adverts/AdvertSet';
import { AdvertsService } from '../_services/Adverts/adverts.service';
import { SnackBarService } from '../_services/SnackBar/snack-bar.service';

@Component({
    selector: 'app-new-advert',
    templateUrl: './new-advert.component.html',
    styleUrls: ['./new-advert.component.scss'],
})
export class NewAdvertComponent implements OnInit {
    NewAdvertForm: FormGroup;
    constructor(
        private fB: FormBuilder,
        private advService: AdvertsService,
        private snackbar: SnackBarService,
        private rt: Router
    ) {}

    ngOnInit(): void {
        this.initForm();
    }

    initForm() {
        this.NewAdvertForm = this.fB.group({
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
        });
    }

    onSubmit(NewAdvertUserFormData) {
        const advert: AdvertSet = {
            adv_name: NewAdvertUserFormData.titre,
            adv_type: NewAdvertUserFormData.type,
            adv_tenants: NewAdvertUserFormData.max,
            adv_status: NewAdvertUserFormData.dispo,
            adv_adress: NewAdvertUserFormData.adress,
            adv_city: NewAdvertUserFormData.city,
            adv_postal: NewAdvertUserFormData.adv_postal,
            adv_price: NewAdvertUserFormData.adv_price,
            adv_usr_id: Number(localStorage.getItem('usr_id')),
            adv_usr_mail: localStorage.getItem('usr_mail'),
            adv_usr_phone: localStorage.getItem('usr_phone'),
        };
        this.snackbar.openSnackBar('Sauvegarde en cours ...', 'ok', 1500);

        this.advService.postAdvert(advert).then((result) => {
            if (result.error !== undefined && result.error.length > 0) {
                this.snackbar.openSnackBar(result.error, 'ok', 1500);
            } else {
                this.snackbar.openSnackBar('Annonce sauvegardé', 'ok', 1500);
                this.rt.navigate(['/search']);
            }
        });
        console.log(advert);
    }
}
