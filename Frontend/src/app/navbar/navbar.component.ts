import { Component, Input, OnInit } from '@angular/core';
import { UserService } from '../_services/User/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user = localStorage.getItem('User');
  constructor(public auth: UserService) { }

  

  ngOnInit(): void {
  }

}
