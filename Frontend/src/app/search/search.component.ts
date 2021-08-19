import { Component, OnInit } from '@angular/core';
import { Advert } from '../models/Adverts/Advert';
import { AdvertsService } from '../_services/Adverts/adverts.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  listAdverts: Advert[];

  constructor(private advService : AdvertsService) { }

  ngOnInit(): void {
    this.advService.getAdvertsByTimestamp().then((adverts) => {

      this.listAdverts = adverts.advertByTimestamp;
    })

    
  }

  onclick(){
    console.log(this.listAdverts);
  }
  
}
