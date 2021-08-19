import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Advert } from 'src/app/models/Adverts/Advert';
import { AdvertSet } from 'src/app/models/Adverts/AdvertSet';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdvertsService {

  constructor(public rt: Router) { }

  async postAdvert(advert:AdvertSet) {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },

      body : JSON.stringify({
        adv_name : advert.adv_name,
        adv_type : advert.adv_type,
        adv_tenants : advert.adv_tenants,
        adv_status: advert.adv_status,
        adv_usr_id: advert.adv_usr_id
      })
    };
    console.log(advert)
   const response =  await fetch(environment.API_URL + "/createAdvert", requestOptions);
   const data = await response.json();
   console.log(data);
   this.rt.navigate(["/"]);
  }

  async getAdvertsByTimestamp(){
    const requestOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body : JSON.stringify({
       page : 10
      })
    }

    const response = await fetch(environment.API_URL + "/getAdvertByTimestamp", requestOptions);
    const data = await response.json();
    return data;
  }
}
