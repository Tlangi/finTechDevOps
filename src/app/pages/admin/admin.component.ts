import {Component, OnDestroy, OnInit} from '@angular/core';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  receivedFilterValue = '';

  constructor() {
  }

  getMessage(value: string) {
    console.log('Value in the admin component: ' + value);
    this.receivedFilterValue = value;
  }

  ngOnInit() {
  }

ngOnDestroy(): void {
  }
}
