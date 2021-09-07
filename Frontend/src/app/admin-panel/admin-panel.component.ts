import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Criteria } from '../models/Criteria/Criteria';
import { CriteriaSet } from '../models/Criteria/CriteriaSet';
import { CriteriaService } from '../_services/Criteria/criteria.service';
import { SnackBarService } from '../_services/SnackBar/snack-bar.service';

@Component({
    selector: 'app-admin-panel',
    templateUrl: './admin-panel.component.html',
    styleUrls: ['./admin-panel.component.scss'],
})
export class AdminPanelComponent implements OnInit {
    criteriaForm: FormGroup;

    criteriasList: Criteria[];
    selected: string = '';
    constructor(
        public FB: FormBuilder,
        private snackbar: SnackBarService,
        private cs: CriteriaService
    ) {}

    criteriaNames: string[] = [];

    ngOnInit(): void {
        this.cs.getCriteria().then((data) => {
            this.criteriasList = data.result;

            for (let i = 0; i < this.criteriasList.length; i++) {
                this.criteriaNames.push(this.criteriasList[i].cri_name);
            }
        });

        this.initForm();
    }

    initForm() {
        this.criteriaForm = this.FB.group({
            criteria: ['', [Validators.required]],
        });
    }

    delete() {
        if (this.selected !== '') {
            let criteriaToDelete: Criteria = {
                cri_id: 1,
                cri_name: '',
            };

            criteriaToDelete.cri_name = this.selected;

            for (let i = 0; i < this.criteriasList.length; i++) {
                if (this.criteriasList[i].cri_name === this.selected) {
                    criteriaToDelete.cri_id = this.criteriasList[i].cri_id;
                }
            }

            this.cs.deleteCriteria(criteriaToDelete).then((result) => {
                if (result.error !== undefined && result.error.length > 0) {
                    this.snackbar.openSnackBar(result.error, 'ok', 1500);
                } else {
                    this.cs.getCriteria().then((data) => {
                        this.criteriasList = data.result;
                        for (let i = 0; i < this.criteriasList.length; i++) {
                            this.criteriaNames[i] =
                                this.criteriasList[i].cri_name;
                        }
                        this.snackbar.openSnackBar(
                            'critére supprimé avec succés',
                            'ok',
                            1500
                        );
                    });
                }
            });
        }
    }

    onSubmit(criteriaFormData) {
        const criteria: CriteriaSet = {
            cri_name: criteriaFormData.criteria,
        };

        this.cs.createCriteria(criteria).then((result) => {
            if (result.error !== undefined && result.error.length > 0) {
                this.snackbar.openSnackBar(result.error, 'ok', 1500);
            } else {
                this.cs.getCriteria().then((data) => {
                    this.criteriasList = data.result;
                    for (let i = 0; i < this.criteriasList.length; i++) {
                        this.criteriaNames[i] = this.criteriasList[i].cri_name;
                    }
                });
                this.snackbar.openSnackBar(
                    'critére ajouté avec succés',
                    'ok',
                    1500
                );
            }
        });
    }
}
