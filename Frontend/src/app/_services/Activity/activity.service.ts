import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class ActivityService {
    constructor(public rt: Router) {}

    async getActivityById(id: number) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                adv_id: id,
            }),
        };

        const response = await fetch(
            environment.API_URL + '/getActivityById',
            requestOptions
        );
        const data = await response.json();
        return data;
    }

}
