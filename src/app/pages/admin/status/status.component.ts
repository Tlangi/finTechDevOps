import {Component, EventEmitter, Inject, OnInit, Optional, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {AdminService} from '../admin.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
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
  @Output() statusTypeFilterValue = new EventEmitter<string>();
  dataSource: StatusTabTableDataSource;

  statusTab: FormGroup = new FormGroup({
    statusType: new FormControl(''),
    subStatusType: new FormControl(''),
    statusTypeDescription: new FormControl('')
  });
  statusTpe: string;
  subStatusType: string;
  statusTypeDescription: string;
  action: string;

  statusTypeList: any[]  = [];
  subStatusTypeList: any[]  = [];
  filteredStatusType: Observable<any[]>;
  filteredSubStatusType: Observable<any[]>;
  constructor(private dialogRef: MatDialogRef<StatusComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) data) {
    this.dataSource = new StatusTabTableDataSource();
    this.statusTpe = data.statusType;
    this.subStatusType = data.subStatusType;
    this.statusTypeDescription = data.statusTypeDescription;
    this.action = data.action;
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

  doAction(): void {
    this.dialogRef.close({event: this.action, data: this.statusTab.value});
  }

  closeDialog(){
    this.dialogRef.close({event: 'Cancel'});
  }

  private filterStatusType(value: string) {
    this.statusFilterValue.emit(value);
    this.statusTypeList = this.dataSource.data;
    if (value.length >= 2) {
      return this.statusTypeList.filter(option => new RegExp(value, 'gi').test(option.status));
    }
  }

  private filterSubStatusType(value: string) {
    const statusType = this.statusTab.controls.statusType.value;
    this.statusTypeFilterValue.emit(value);
    if (statusType.length > 0 && value.length > 1) {
      if (statusType === 'State of Emergency') {
        this.subStatusTypeList = this.statusTypeList[0].statusType;
        this.statusTab.controls.statusTypeDescription.setValue(
          this.subStatusTypeList.filter(option =>
            new RegExp(value, 'gi').test(option.subStatus))[0].description
        );
      } else if (statusType === 'Approval State') {
        this.subStatusTypeList = this.statusTypeList[1].statusType;
        this.statusTab.controls.statusTypeDescription.setValue(
          this.subStatusTypeList.filter(option =>
            new RegExp(value, 'gi').test(option.subStatus))[0].description
        );
      } else if (statusType === 'Project State') {
        this.subStatusTypeList = this.statusTypeList[2].statusType;
        this.statusTab.controls.statusTypeDescription.setValue(
          this.subStatusTypeList.filter(option =>
            new RegExp(value, 'gi').test(option.subStatus))[0].description
        );
      } else {
        this.subStatusTypeList = [];
        this.statusTab.controls.statusTypeDescription.setValue(
          ''
        );
      }
    }
    return this.subStatusTypeList.filter(option =>
      new RegExp(value, 'gi').test(option.subStatus));
  }

}
