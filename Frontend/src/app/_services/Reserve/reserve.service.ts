import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ReserveService {
    constructor() {}

    async getDatebyAdvRes(adv_id: number) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Accept: 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                res_adv_id: adv_id,
            }),
        };

        const response = await fetch(
            environment.API_URL + '/getDatebyAdvRes',
            requestOptions
        );
        const dates = await response.json();
        return dates;
    }
}
