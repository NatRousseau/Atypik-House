import { Component, Input, OnInit } from '@angular/core';
import { AuthContextService } from '../_services/AuthContext/auth-context.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user = localStorage.getItem('User');
  constructor(public auth: AuthContextService) { }

  

  ngOnInit(): void {
  }

}
