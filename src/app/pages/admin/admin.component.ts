import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  receivedFilterValue = '';

  constructor(private adminService: AdminService) {
  }

  getMessage(value: string) {
    console.log('Value in the admin component' + value);
    this.receivedFilterValue = value;
  }

  ngOnInit() {
  }

ngOnDestroy(): void {
  }
}
