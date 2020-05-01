import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {AdminService} from './admin.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../helpers/components/dialog/dialog.component';
import {PopupDailogComponent} from '../../helpers/components/popup-dailog/popup-dailog.component';
import {PageEvent} from '@angular/material/paginator';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  constructor() {
  }

  ngOnInit() {
  }
  ngOnDestroy() {
  }
}
