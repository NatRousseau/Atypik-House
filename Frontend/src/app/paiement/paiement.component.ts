import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ReserveComponent } from '../reserve/reserve.component';
import { ReserveService } from '../_services/Reserve/reserve.service';
import { HttpClientModule } from '@angular/common/http';
import { ReserveCreated } from '../_services/Reserve/reserveCreated';
import { StatusUser } from '../_services/User/statusUser';
import { Advert } from '../models/Adverts/Advert';
import { AdvertsService } from '../_services/Adverts/adverts.service';
import { IPayPalConfig } from 'ngx-paypal';
import { Reserve } from '../models/Reserve/Reserve';

@Component({
    selector: 'app-paiement',
    templateUrl: './paiement.component.html',
    styleUrls: ['./paiement.component.scss'],
})
export class PaiementComponent implements OnInit {
    public payPalConfig?: IPayPalConfig;

    test = '100';
    advert: Advert;
    total: number;
    price: number;
    day: number;
    constructor(
        private rt: Router,
        private route: ActivatedRoute,
        private reserve: ReserveCreated,
        private adv: AdvertsService,
        public rs: ReserveService
    ) {}

    id: string;
    @ViewChild('paypal', { static: true }) paypalElement: any;
    ngOnInit(): void {
        if (this.reserve.reserve === undefined) {
            this.rt.navigate(['/search']);
        }
        this.id = this.route.snapshot.paramMap.get('id');

        this.price = this.reserve.reserve.res_adv_price;
        this.total = this.getTotalPrice(this.reserve.reserve.res_adv_price);

        window.addEventListener('beforeunload', function (e) {
            let confirmationMessage = 'o/';
            e.returnValue = confirmationMessage;
            return confirmationMessage;
        });
        let reserveCreated: Reserve = this.reserve.reserve;
        this.adv.getAdverById(Number(this.id)).then((data) => {
            this.advert = data.selectedAdvert;
        });
        let totalOrder = this.total;

        window.paypal
            .Buttons({
                style: {
                    size: 'small',
                    layout: 'horizontal',
                    color: 'blue',
                },
                createOrder: function (data, actions) {
                    return actions.order.create({
                        purchase_units: [
                            {
                                amount: {
                                    value: totalOrder,
                                    currency_code: 'EUR',
                                },
                            },
                        ],
                    });
                },

                onApprove: function (data, actions) {
                    alert('paiement effectué' + data.subscriptionID);
                },
                onCancel: function (data) {
                    alert('paiement annulé' + data.subscriptionID);
                },
                onClick: function () {
                    let rsp: ReserveService = new ReserveService();
                    rsp.createReserve(reserveCreated);
                },
            })
            .render(this.paypalElement.nativeElement);
        console.log('paypal', window.paypal);
    }

    getTotalPrice(price: number) {
        let totalPrice: number;
        let start: Date = this.reserve.reserve.res_date_start;
        let end: Date = this.reserve.reserve.res_date_end;
        let time = end.getTime() - start.getTime();
        let dayTime = time / (1000 * 3600 * 24);
        dayTime++;
        this.day = dayTime;
        totalPrice = dayTime * price;

        return totalPrice;
    }
}
