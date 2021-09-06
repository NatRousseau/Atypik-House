import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Advert} from '../models/Adverts/Advert';
import {AdvertUpdate} from '../models/Adverts/AdvertUpdate';
import {AdvertsService} from '../_services/Adverts/adverts.service';
import {SnackBarService} from '../_services/SnackBar/snack-bar.service';
import {CriteriaService} from "../_services/Criteria/criteria.service";
import {Criteria} from "../models/Criteria/Criteria";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
    selector: 'app-update-advert',
    templateUrl: './update-advert.component.html',
    styleUrls: ['./update-advert.component.scss'],
})
export class UpdateAdvertComponent implements OnInit {
    updateAdvertForm: FormGroup;
    advert: Advert;
    usrId: string;
    listCriterias: Criteria[];
    idsCriterias: number[] = [];

    constructor(
        private fB: FormBuilder,
        private advService: AdvertsService,
        private snackbar: SnackBarService,
        private rt: Router,
        private route: ActivatedRoute,
        private criteriaService: CriteriaService,
    ) {
    }

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
        this.criteriaService.getCriteria().then((criterias) => {
            this.listCriterias = criterias.result;
        });
        this.initForm();
    }

    onChange(value: MatSlideToggleChange, id: number) {
        if (value.checked === true) {
            this.idsCriterias.push(id);
        } else {
            const index = this.idsCriterias.indexOf(id);
            if (index > -1) {
                this.idsCriterias.splice(index, 1);
            }
        }
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

    onSubmitCriterias() {
        const criteriaList = this.idsCriterias;
        if (criteriaList.length <= this.advert[0].adv_cri_limit) {
            const linkCriteria = {
                adv_id: this.advert[0].adv_id,
                cri_ids: criteriaList,
                adv_cri_limit: this.advert[0].adv_cri_limit,
            }
            this.criteriaService.linkCriteriAdvert(linkCriteria).then(() => {});
            return true
        } else {
            this.snackbar.openSnackBar('Vous avez sélectionner trop de critères ! limite : ' + this.advert[0].adv_cri_limit, 'ok', 1500);
            return false
        }
    }

    onSubmit(updateAdvertUserFormData) {
        if (this.onSubmitCriterias()) {
            const advert: AdvertUpdate = {
                adv_id: this.advert[0].adv_id,
                adv_up: this.advert[0].adv_up,
                adv_name: updateAdvertUserFormData.titre,
                adv_type: updateAdvertUserFormData.type,
                adv_tenants: updateAdvertUserFormData.max,
                adv_status: updateAdvertUserFormData.dispo,
                adv_adress: updateAdvertUserFormData.adress,
                adv_city: updateAdvertUserFormData.city,
                adv_postal: updateAdvertUserFormData.adv_postal,
                adv_price: updateAdvertUserFormData.adv_price,
                adv_usr_id: Number(localStorage.getItem('usr_id')),
                adv_describe: updateAdvertUserFormData.describe,
            };
            this.snackbar.openSnackBar('Sauvegarde en cours ...', 'ok', 1500);

            this.advService.updateAdvert(advert).then((result) => {
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
}
