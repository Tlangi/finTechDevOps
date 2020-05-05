import {Component, OnDestroy, OnInit} from '@angular/core';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  receivedFilterValue = '';
  tabIndex: number;

  constructor() {
  }

  getMessage(value: string) {
    console.log('Value in the admin component: ' + value);
    this.receivedFilterValue = value;
  }
  getTabIndex(tabChangeEvent: MatTabChangeEvent): void {
    console.log(tabChangeEvent.index);
    if (tabChangeEvent.index >= 0) {
      this.tabIndex = tabChangeEvent.index;
    } else {
      this.tabIndex = 0;
    }
  }

  ngOnInit() {
    this.tabIndex = 0;
  }

ngOnDestroy(): void {
  }
}
