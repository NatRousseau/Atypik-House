import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {CommentarySet} from "../../models/Commentary/CommentarySet";

@Injectable({
    providedIn: 'root',
})
export class CommentaryService {
    constructor(public rt: Router) {}

    async createCommentary(commentary: CommentarySet) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                com_text: commentary.com_text,
                com_adv_id:commentary.com_adv_id,
                com_usr_id: commentary.com_usr_id,
                com_usr_firstName: commentary.com_usr_firstName,
                com_usr_lastName: commentary.com_usr_lastName,
            }),
        };

        const response = await fetch(
            environment.API_URL + '/createCommentary',
            requestOptions
        );
        const data = await response.json();
        return data;
    }

    async getCommentaryByAdvert(id: number) {
        const requestOptions = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
            },
            body: JSON.stringify({
                com_adv_id: id,
            }),
        };

        const response = await fetch(
            environment.API_URL + '/getCommentarybyAdvert',
            requestOptions
        );
        const data = await response.json();
        return data;
    }

}
