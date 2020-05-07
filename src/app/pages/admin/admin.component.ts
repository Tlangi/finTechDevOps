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
  applicationFilterValue = '';
  workTypeFilterValue = '';
  tableTitle = '';
  tabIndex: number;

  constructor() {
  }
  getUsersFullNameFilterValue(value: string) {
    // console.log('Value in the admin component: ' + value);
    this.usersFullNameFilterValue = value;
  }

  getUsersTeamsFilterValue(value: string) {
    this.usersTeamsFilterValue = value;
  }

  getUsersStatusFilterValue(value: string) {
    this.usersStatusFilterValue = value;
  }
  getStatusTabFilterValue(value) {
    this.statusTabFilterValue = value;
  }
  getApplicationsFilterValue(value: string) {
    this.applicationFilterValue = value;
  }
  getWorkTypeFilterValue(value: string) {
    this.workTypeFilterValue = value;
  }
  getTabIndex(tabChangeEvent: MatTabChangeEvent): void {
    console.log(tabChangeEvent.index);
    if (tabChangeEvent.index >= 0) {
      this.tabIndex = tabChangeEvent.index;
      if (tabChangeEvent.index === 1) {
        this.tableTitle = 'Applications';
      } else if (tabChangeEvent.index === 2) {
        this.tableTitle = 'Work Type';
      }
    }
  }

  ngOnInit() {
    this.tabIndex = 0;
  }

ngOnDestroy(): void {
  }
}
