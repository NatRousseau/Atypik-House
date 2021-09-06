import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
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

    async linkCriteriAdvert(linkCriteri) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                ria_adv_id: linkCriteri.adv_id,
                ria_cri_id: linkCriteri.cri_ids,
                adv_cri_limit: linkCriteri.adv_cri_limit,
            }),
        };

        const response = await fetch(
            environment.API_URL + '/linkCriteriAdvert',
            requestOptions
        );
        const data = await response.json();
        return data;
    }

}
