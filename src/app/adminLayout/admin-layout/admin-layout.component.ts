import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../../authentication/services/authentication.service';
import {User} from '../../authentication/model/user';
import {Router} from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent implements OnInit {

  currentUser: User;

  constructor(private authenticationService: AuthenticationService,
              private router: Router
  ) { }

  ngOnInit(): void {
  }

  onLogout() {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
