import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-details-announcement',
  templateUrl: './details-announcement.component.html',
  styleUrls: ['./details-announcement.component.scss']
})
export class DetailsAnnouncementComponent implements OnInit {
  id: string;
  constructor( private route: ActivatedRoute, private rt: Router) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
  }

}
