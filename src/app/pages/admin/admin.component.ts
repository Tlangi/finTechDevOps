import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  receivedFilterValue = '';
  employeesTeamsFilterValue = '';
  employeesStatusFilterValue = '';
  statusTabFilterValue = '';
  applicationFilterValue = '';
  workTypeFilterValue = '';
  tableTitle = '';
  tabIndex: number;
  employeesIndex: number;

  constructor() {
  }
  getEmployeesTeamsFilterValue(value: string) {
    // console.log('Teams value: ' + this.employeesTeamsFilterValue);
    this.employeesTeamsFilterValue = value;
  }
  getEmployeesStatusFilterValue(value: string) {
    this.employeesStatusFilterValue = value;
  }
  getMessage(value: string) {
    // console.log('Value in the admin component: ' + value);
    this.receivedFilterValue = value;
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
  getEmployeesTabIndex(employeesTabChangeEvent: MatTabChangeEvent): void {
    console.log('Employees tabs: ' + employeesTabChangeEvent.index);
    if (employeesTabChangeEvent.index >= 0) {
      this.employeesIndex = employeesTabChangeEvent.index;
    }
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
    this.employeesIndex = 0;
  }

ngOnDestroy(): void {
  }
}
