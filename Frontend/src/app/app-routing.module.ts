import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminPanelComponent } from './admin-panel/admin-panel.component';

import { DetailsAnnouncementComponent } from './details-annoucement/details-announcement.component';
import { HomeComponent } from './home/home.component';
import { NewAdvertComponent } from './new-Advert/new-advert.component';
import { PaiementComponent } from './paiement/paiement.component';
import { ReserveByAdvertComponent } from './reserve-by-advert/reserve-by-advert.component';
import { ReserveComponent } from './reserve/reserve.component';

import { SearchComponent } from './search/search.component';
import { UpdateAdvertComponent } from './update-advert/update-advert.component';
import { connectionComponent } from './user-connection/connection.component';
import { UserProfilComponent } from './user-profil/user-profil.component';
import { registerComponent } from './user-register/register.component';

const routes: Routes = [
    { path: '404', redirectTo: 'connection', pathMatch: 'full' },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'connection', component: connectionComponent },
    { path: 'register', component: registerComponent },
    { path: 'search', component: SearchComponent },
    { path: 'detail/:id', component: DetailsAnnouncementComponent },
    { path: 'NewAdvert', component: NewAdvertComponent },
    { path: 'Reserve/:id', component: ReserveComponent },
    { path: 'paiement/:id', component: PaiementComponent },
    { path: 'profil', component: UserProfilComponent },
    { path: 'reserveByAdvert/:adv', component: ReserveByAdvertComponent },
    { path: 'updateAdvert/:id', component: UpdateAdvertComponent },
    { path: 'adminPanel', component: AdminPanelComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(routes, {
    initialNavigation: 'enabled'
})],
    exports: [RouterModule],
})
export class AppRoutingModule {}
