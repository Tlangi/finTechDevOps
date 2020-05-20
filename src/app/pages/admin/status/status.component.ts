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
    statusId: new FormControl(),
    status: new FormControl(),
    statusType: new FormControl(''),
    statusTypeDescription: new FormControl('')
  });
  statusId: number;
  status: string;
  statusType: string;
  statusTypeDescription: string;
  action: string;

  statusList: any[] = [];
  statusTypeList: any[]  = [];
  filteredStatusType: Observable<any>;
  constructor(private dialogRef: MatDialogRef<StatusComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) data) {
    this.statusId = data.subId;
    this.statusType = data.subStatus;
    this.statusTypeDescription = data.description;
    this.action = data.action;
    console.log(data);
  }

  private checkAction() {
    if (this.action === 'Update') {
      this.statusTab.setValue({
        statusId: this.statusId,
        status: '',
        statusType: this.statusType,
        statusTypeDescription: this.statusTypeDescription
      });
    } else if (this.action === 'Delete') {
      this.statusTab.setValue({
        statusId: this.statusId,
        status: '',
        statusType: this.statusType,
        statusTypeDescription: this.statusTypeDescription
      });
    } else if (this.action === 'Add') {
      this.statusTab.setValue({
        statusId: '',
        status: '',
        statusType: '',
        statusTypeDescription: ''
      });
    }
  }

  ngOnInit(): void {
    this.checkAction();
    this.filteredStatusType = this.statusTab.controls.statusTypeDescription.valueChanges
      .pipe(
        startWith(''),
        map(description => this.filterStatusType(description))
      );
  }

  doAction(): void {
    this.dialogRef.close({event: this.action, data: this.statusTab.value});
  }

  closeDialog(){
    this.dialogRef.close({event: 'Cancel'});
  }

  private filterStatusType(value: string) {
    this.statusTypeList = this.dataSource.data;
    if (value.length >= 2) {
      this.dataSource.data.filter((status, key) => {
        console.log(status.statusType);
      });
    }
  }
}
