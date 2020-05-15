import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { StatusTabTableDataSource, StatusTabTableItem } from './status-tab-table-datasource';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AdminDialogBoxComponent} from '../../admin-dialog-box/admin-dialog-box.component';
import {element} from 'protractor';

@Component({
  selector: 'app-status-tab-table',
  templateUrl: './status-tab-table.component.html',
  styleUrls: ['./status-tab-table.component.css']
})
export class StatusTabTableComponent implements AfterViewInit, OnInit {
  @Input() statusValueChange: string;
  @Input() subStatusValueChange: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<StatusTabTableItem>;
  dataSource: StatusTabTableDataSource;
  emergencyList = [];
  approvalList = [];
  projectList = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'status', 'statusType', 'action'];
  displayedSubColumns = ['id', 'status', 'description', 'action'];
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
    this.dataSource.data.filter( ((value1, index) => {
      if (index === 0) {
        this.emergencyList = value1.statusType.slice(0, 5);
        console.log('Emergency List: ' + this.emergencyList);
      } else if (index === 1) {
        this.approvalList = value1.statusType.slice(0, 5);
        console.log('Approval List: ' + this.approvalList);
      } else if (index === 2) {
        this.projectList = value1.statusType.slice(0, 5);
        console.log('Project List: ' + this.projectList);
      }
    }));
    this.onFilterValueChange();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
  onFilterValueChange(): void {
    this.dataTableFilter.controls.tableFilterInput.valueChanges.subscribe(value => {
      if (value.length > 1) {
      } else {
        this.table.dataSource = this.dataSource;
      }
    });
  }
}
