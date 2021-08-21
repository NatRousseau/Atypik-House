import { Component, Input, OnInit } from '@angular/core';
import { StatusUser } from '../_services/User/statusUser';
import { UserService } from '../_services/User/user.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  user = localStorage.getItem('User');
  constructor(public auth: UserService , public statusUser: StatusUser) { }



  ngOnInit(): void {
  }

  disconnect() {
    this.auth.disconnectUser();
  }

}
