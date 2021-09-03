import { Injectable } from '@angular/core';
import { Reserve } from 'src/app/models/Reserve/Reserve';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ReserveService {
    constructor() {}

    async getDatebyAdvRes(advId: number) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                res_adv_id: advId,
            }),
        };

        const response = await fetch(
            environment.API_URL + '/getDatebyAdvRes',
            requestOptions
        );
        const dates = await response.json();
        return dates;
    }

    async createReserve(reserve: Reserve) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                res_usr_id: reserve.res_usr_id,
                res_adv_id: reserve.res_adv_id,
                res_date_start: reserve.res_date_start,
                res_date_end: reserve.res_date_end,
                res_adv_price: reserve.res_adv_price,
                res_adv_tenants: reserve.res_adv_tenants,
                res_usr_mail: reserve.res_usr_mail,
                res_usr_phone: reserve.res_usr_phone,
            }),
        };

        const response = await fetch(
            environment.API_URL + '/createReserve',
            requestOptions
        );

        const data = await response.json();
        return data;
    }

    async deleteReserve(resId: number) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                res_id: resId,
            }),
        };

        const response = await fetch(
            environment.API_URL + '/deleteReserve',
            requestOptions
        );

        const data = await response.json();
        return data;
    }
}
