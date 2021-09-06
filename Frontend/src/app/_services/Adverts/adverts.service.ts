import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Advert } from 'src/app/models/Adverts/Advert';
import { AdvertSet } from 'src/app/models/Adverts/AdvertSet';
import { environment } from 'src/environments/environment';

@Injectable({
    providedIn: 'root',
})
export class AdvertsService {
    constructor(public rt: Router) {}

    async getAdvertsByTimestamp() {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                page: 10,
            }),
        };

        const response = await fetch(
            environment.API_URL + '/getAdvertByTimestamp',
            requestOptions
        );
        const data = await response.json();
        return data;
    }

    async getAdverById(id: number) {
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
            environment.API_URL + '/getAdvertbyId',
            requestOptions
        );
        const data = await response.json();
        return data;
    }
    async getUserAdvert(id: string) {
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                adv_usr_id: id,
            }),
        };

        const response = await fetch(
            environment.API_URL + '/getUserAdvert',
            requestOptions
        );
        const data = await response.json();
        return data;
    }

    async postAdvert(advert: AdvertSet) {
        const requestOptions = {
            method: 'POST',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },

            body: JSON.stringify({
                adv_name: advert.adv_name,
                adv_type: advert.adv_type,
                adv_tenants: advert.adv_tenants,
                adv_status: advert.adv_status,
                adv_adress: advert.adv_adress,
                adv_city: advert.adv_city,
                adv_postal: advert.adv_postal,
                adv_price: advert.adv_price,
                adv_usr_id: advert.adv_usr_id,
                adv_usr_mail: advert.adv_usr_mail,
                adv_usr_phone: advert.adv_usr_phone,
                adv_describe: advert.adv_describe,
            }),
        };

        const response = await fetch(
            environment.API_URL + '/createAdvert',
            requestOptions
        );
        const data = await response.json();
        return data;
    }

    async updateAdvert(advert: AdvertSet) {
        const requestOptions = {
            method: 'PUT',
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },

            body: JSON.stringify({
                adv_name: advert.adv_name,
                adv_type: advert.adv_type,
                adv_tenants: advert.adv_tenants,
                adv_status: advert.adv_status,
                adv_adress: advert.adv_adress,
                adv_city: advert.adv_city,
                adv_postal: advert.adv_postal,
                adv_price: advert.adv_price,
                adv_usr_id: advert.adv_usr_id,
                adv_usr_mail: advert.adv_usr_mail,
                adv_usr_phone: advert.adv_usr_phone,
                adv_describe: advert.adv_describe,
            }),
        };
        const response = await fetch(
            environment.API_URL + '/updateAdvert',
            requestOptions
        );
        const data = await response.json();
        return data;
    }
}
