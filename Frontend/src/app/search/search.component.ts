import { Component, OnInit } from '@angular/core';
import { StatusUser } from '../_services/User/statusUser';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
    constructor(public statusUser: StatusUser) {}

    ngOnInit(): void {}
}
