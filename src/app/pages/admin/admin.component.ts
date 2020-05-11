import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  usersFullNameFilterValue = '';
  usersTeamsFilterValue = '';
  usersStatusFilterValue = '';
  statusTabFilterValue = '';
  subStatusTypeFilterValue = '';
  applicationFilterValue = '';
  workTypeFilterValue = '';
  tabIndex: number;

  constructor() {
  }
  getUsersFullNameFilterValue(value: string) {
    this.usersFullNameFilterValue = value;
  }

  getUsersTeamsFilterValue(value: string) {
    this.usersTeamsFilterValue = value;
  }

  getUsersStatusFilterValue(value: string) {
    this.usersStatusFilterValue = value;
  }

  getApplicationsFilterValue(value: string) {
    this.applicationFilterValue = value;
  }
  getWorkTypeFilterValue(value: string) {
    this.workTypeFilterValue = value;
  }
  getStatusTabFilterValue(value) {
    this.statusTabFilterValue = value;
  }
  getSubStatusTabFilterValue(value) {
    this.subStatusTypeFilterValue = value;
  }
  getTabIndex(tabChangeEvent: MatTabChangeEvent): void {
    if (tabChangeEvent.index >= 0) {
      this.tabIndex = tabChangeEvent.index;
    }
  }

  ngOnInit() {
    this.tabIndex = 0;
  }

ngOnDestroy(): void {
  }
}
