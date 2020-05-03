import {AfterViewInit, Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable, Subscription} from 'rxjs';
import {AdminService} from './admin.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../helpers/components/dialog/dialog.component';
import {PopupDailogComponent} from '../../helpers/components/popup-dailog/popup-dailog.component';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {DataTable} from './dataTable';
import {MatTableDataSource} from '@angular/material/table';
import {MatTabChangeEvent} from '@angular/material/tabs';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit, OnDestroy {

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
  }

ngOnDestroy(): void {
  }
}
