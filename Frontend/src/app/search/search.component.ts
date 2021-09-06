import {Component, OnInit} from '@angular/core';
import {Advert} from '../models/Adverts/Advert';
import {AdvertsService} from '../_services/Adverts/adverts.service';
import {StatusUser} from '../_services/User/statusUser';
import {CriteriaService} from "../_services/Criteria/criteria.service";
import {Criteria} from "../models/Criteria/Criteria";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AdvertSet} from "../models/Adverts/AdvertSet";
import {MatSlideToggleChange} from "@angular/material/slide-toggle";

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    listAdverts: Advert[];
    listCriterias: Criteria[];
    idsCriterias: number[] = [];
    CriteriaForm: FormGroup;

    constructor(
        public statusUser: StatusUser,
        private fB: FormBuilder,
        private advService: AdvertsService,
        private criteriaService: CriteriaService,
    ) {
    }

    ngOnInit(): void {
        this.initForm();
        this.advService.getAdvertsByTimestamp().then((adverts) => {
            this.listAdverts = adverts.advertByTimestamp;
        });
        this.criteriaService.getCriteria().then((criterias) => {
            this.listCriterias = criterias.result;
        });
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

    onSubmit() {
        const criteriaList = this.idsCriterias;
        if (criteriaList.length > 0) {
            this.criteriaService.getAdvertByCriteria(criteriaList).then((result) => {
                this.listAdverts = result.advList;
            });
        } else {
            this.advService.getAdvertsByTimestamp().then((adverts) => {
                this.listAdverts = adverts.advertByTimestamp;
            });
        }
    }

    initForm() {
        this.CriteriaForm = this.fB.group({
            checked: [false],
        });
    }
}
