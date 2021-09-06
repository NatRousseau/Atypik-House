import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Criteria } from 'src/app/models/Criteria/Criteria';
import { CriteriaSet } from 'src/app/models/Criteria/CriteriaSet';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class CriteriaService {
    constructor(public rt: Router) {}

    async getCriteria() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
        };

        const response = await fetch(
            environment.API_URL + '/getCriteria',
            requestOptions
        );
        const data = await response.json();
        return data;
    }

    async getAdvertByCriteria(ids: number[]) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                page: 10,
                cri_id: ids,
            }),
        };

        const response = await fetch(
            environment.API_URL + '/getAdvertByCriteria',
            requestOptions
        );
        const data = await response.json();
        return data;
    }

    async createCriteria(criteria: CriteriaSet) {
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                cri_name: criteria.cri_name,
            }),
        };

        const response = await fetch(
            environment.API_URL + '/createCriteria',
            requestOptions
        );
        const data = await response.json();
        return data;
    }

    async deleteCriteria(criteriaToDelete: Criteria) {
        const requestOptions = {
            method: 'DELETE',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                cri_id: criteriaToDelete.cri_id,
                cri_name: criteriaToDelete.cri_name,
            }),
        };

        const response = await fetch(
            environment.API_URL + '/deleteCriteria',
            requestOptions
        );
        const data = await response.json();
        return data;
    }
}
