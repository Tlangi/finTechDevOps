import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { StatusTabTableDataSource, StatusTabTableItem } from './status-tab-table-datasource';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AdminDialogBoxComponent} from '../../admin-dialog-box/admin-dialog-box.component';

@Component({
  selector: 'app-status-tab-table',
  templateUrl: './status-tab-table.component.html',
  styleUrls: ['./status-tab-table.component.css']
})
export class StatusTabTableComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() statusValueChange: string;
  @Input() subStatusValueChange: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<StatusTabTableItem>;
  dataSource: StatusTabTableDataSource;
  subStatusList = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'status', 'statusType', 'description', 'action'];
  dataTableFilter: FormGroup = new FormGroup({
      tableFilterInput: new FormControl(''),
    }
  );

  constructor(public dialog: MatDialog) {
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(AdminDialogBoxComponent, {
      width: '60%',
      data: obj
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result.event === 'Add') {
        this.addRowData(result.data);
      } else if (result.event === 'Update') {
        this.updateRowData(result.data);
      } else if (result.event === 'Delete') {
        this.deleteRowData(result.data);
      }
    });
  }

  addRowData(rowObject) {
    const date = new Date();
    this.dataSource.data.push({
      id: date.getTime(),
      status: rowObject.status,
      statusType: rowObject.statusType,
    });
    this.table.renderRows();
  }

  updateRowData(rowObject) {
    this.dataSource.data =  this.dataSource.data.filter((value, key) => {
      if (value.id === rowObject.id) {
        value.status = rowObject.status;
      }
      return true;
    });
  }

  deleteRowData(rowObject) {
    this.dataSource.data = this.dataSource.data.filter((value, key) => {
      return value.id !== rowObject.id;
    });
  }

  ngOnInit() {
    this.dataSource = new StatusTabTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.doFilter();
    this.doFilterSubStatus();
  }

  public doFilter() {
    if (this.statusValueChange.length > 0) {
      this.subStatusList = this.dataSource.data.filter(option =>
        new RegExp(this.statusValueChange, 'gi').test(option.status))[0].statusType;
      // console.log(this.subStatusList);
      this.table.dataSource = this.dataSource.data.filter(option =>
        new RegExp(this.statusValueChange, 'gi').test(option.status));
    }
  }

  public doFilterSubStatus() {
    if (this.subStatusValueChange.length > 0) {
      if (this.statusValueChange === 'State of Emergency') {
        this.subStatusList = this.dataSource.data[0].statusType.filter(option =>
          new RegExp(this.subStatusValueChange, 'gi').test(option.subStatus));
      } else if (this.statusValueChange === 'Approval State') {
        this.subStatusList = this.dataSource.data[1].statusType.filter(option =>
          new RegExp(this.subStatusValueChange, 'gi').test(option.subStatus));
      }  else if (this.statusValueChange === 'Project State') {
        this.subStatusList = this.dataSource.data[2].statusType.filter(option =>
          new RegExp(this.subStatusValueChange, 'gi').test(option.subStatus));
      }
    }
  }
}
