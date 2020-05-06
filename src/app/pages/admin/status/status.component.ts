import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {AdminService} from '../admin.service';
import {MatDialog} from '@angular/material/dialog';
import {map, startWith} from 'rxjs/operators';
import {PopupDailogComponent} from '../../../helpers/components/popup-dailog/popup-dailog.component';
import {DialogComponent} from '../../../helpers/components/dialog/dialog.component';
import {StatusTabTableDataSource} from './status-tab-table/status-tab-table-datasource';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css']
})
export class StatusComponent implements OnInit {
  @Output() statusFilterValue = new EventEmitter<string>();
  dataSource: StatusTabTableDataSource;

  statusTab: FormGroup = new FormGroup({
    statusType: new FormControl(''),
    subStatusType: new FormControl(''),
    statusTypeDescription: new FormControl('')
  });

  statusTypeList: any[]  = [];
  subStatusTypeList: any[]  = [];
  filteredStatusType: Observable<any[]>;
  filteredSubStatusType: Observable<any[]>;
  constructor(private adminService: AdminService,
              private matDialog: MatDialog) {
    this.dataSource = new StatusTabTableDataSource();
  }

  ngOnInit(): void {
    this.filteredStatusType = this.statusTab.controls.statusType.valueChanges
      .pipe(
        startWith(''),
        map(statusType => this.filterStatusType(statusType))
      );
    this.filteredSubStatusType = this.statusTab.controls.subStatusType.valueChanges
      .pipe(
        startWith(''),
        map(subStatusType => this.filterSubStatusType(subStatusType))
      );
  }

  private filterStatusType(value: string) {
    this.statusFilterValue.emit(value);
    this.statusTypeList = this.dataSource.data;
    /* this.adminService.getStatusTab().subscribe(data => {
      this.statusTypeList = data;
    }); */
    if (value.length >= 2) {
      return this.statusTypeList.filter(option => new RegExp(value, 'gi').test(option.name));
    }
  }

  private filterSubStatusType(value: string) {
    const statusType = this.statusTab.controls.statusType.value;
    if (statusType.length > 0) {
      this.adminService.getStatusTab().subscribe(data => {
        this.subStatusTypeList = data.filter(typeStatus => typeStatus.statusNames === statusType)[0].statusTypes;
        // console.log(this.subStatusTypeList);
      });
      if (value.length >= 1) {
        return this.subStatusTypeList.filter(option => new RegExp(value, 'gi').test(option.stateType));
      }
    }
  }

  updateStatusTab() {
    console.log('submitted');
    const dialogRef = this.matDialog.open(PopupDailogComponent,
      {data: {tabName: this.statusTab.controls.subStatusType.value, name: 'Work Type'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  removeStatusTab() {
    console.log('submitted');
    const dialogRef = this.matDialog.open(DialogComponent,
      {data: {tabName: this.statusTab.controls.subStatusType.value, name: 'Work Type'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }


}
