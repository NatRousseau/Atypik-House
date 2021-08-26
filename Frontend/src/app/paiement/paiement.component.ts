import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-paiement',
    templateUrl: './paiement.component.html',
    styleUrls: ['./paiement.component.scss'],
})
export class PaiementComponent implements OnInit {
    constructor(private rt: Router, private route: ActivatedRoute) {}

    id: string;
    ngOnInit(): void {
        this.id = this.route.snapshot.paramMap.get('id');
    }
}
