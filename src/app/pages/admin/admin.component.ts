import {Component, OnDestroy, OnInit} from '@angular/core';
import {AdminService} from './admin.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  receivedFilterValue: string;

  constructor(private adminService: AdminService) {
  }

  getMessage(value: string) {
    console.log(value);
    this.receivedFilterValue = value;
  }

  ngOnInit() {
  }

ngOnDestroy(): void {
  }
}
