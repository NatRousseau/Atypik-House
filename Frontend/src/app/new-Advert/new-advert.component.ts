import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AdvertSet } from '../models/Adverts/AdvertSet';
import { AdvertsService } from '../_services/Adverts/adverts.service';

@Component({
  selector: 'app-new-advert',
  templateUrl: './new-advert.component.html',
  styleUrls: ['./new-advert.component.scss']
})
export class NewAdvertComponent implements OnInit {

  NewAdvertForm: FormGroup;
  constructor( private fB: FormBuilder, private advService: AdvertsService) { }

  ngOnInit(): void {
    this.initForm();
  }


  initForm() {
    this.NewAdvertForm = this.fB.group(
      {
        titre: ['', [Validators.required]],
        type: ['', [Validators.required]],
        max: ['', [Validators.required, Validators.pattern(/^[0-9]\d*$/)]],
        dispo: [''],
        
      })
  }

  onSubmit(NewAdvertUserFormData) {

    const advert: AdvertSet = {
			adv_name: NewAdvertUserFormData.titre,
			adv_type: NewAdvertUserFormData.type,
      adv_tenants: NewAdvertUserFormData.max,
      adv_status: NewAdvertUserFormData.dispo,
      adv_usr_id: 1
		};

    this.advService.postAdvert(advert)
    console.log(advert);
   
  }
}
