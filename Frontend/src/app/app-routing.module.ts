import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccueilComponent } from './accueil/accueil.component';
import { HomeComponent } from './home/home.component';
import { SearchComponent } from './search/search.component';
import { connectionComponent } from './user-connection/connection.component';
import { registerComponent } from './user-register/register.component';


const routes: Routes = [
  { path: '404', redirectTo: 'connection', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'connection', component: connectionComponent },
  { path: 'register', component: registerComponent },
  { path: 'search', component: SearchComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
