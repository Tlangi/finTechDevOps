import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AdminDialogBoxComponent} from '../admin-dialog-box/admin-dialog-box.component';
import {ApplicationsTableDataSource} from '../applications/applications-table/applications-table-datasource';
import {WorkTypeDataTableDataSource} from '../work-type/work-type-data-table/work-type-data-table-datasource';
import {StatusTabTableDataSource} from '../status/status-tab-table/status-tab-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @Input() usersFilterValue: string;
  @Input() usersTeamsFilterValue: string;
  @Input() usersStatusFilterValue: string;
  @Input() tabIndexValue: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DataTableItem>;
  usersDataSource: DataTableDataSource;

  dataTableFilter: FormGroup = new FormGroup({
    tableFilterInput: new FormControl(''),
    }
  );

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'team', 'status', 'action'];

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
    this.usersDataSource.data.push({
      id: date.getTime(),
      name: rowObject.name,
      team: rowObject.team,
      status: rowObject.status
    });
    this.table.renderRows();
  }

  updateRowData(rowObject) {
    this.usersDataSource.data =  this.usersDataSource.data.filter((value, key) => {
      if (value.id === rowObject.id) {
        value.name = rowObject.name;
    }
      return true;
    });
  }

  deleteRowData(rowObject) {
    this.usersDataSource.data = this.usersDataSource.data.filter((value, key) => {
      return value.id !== rowObject.id;
    });
  }

  ngOnInit() {
    this.usersDataSource = new DataTableDataSource();
    this.onFilterValueChange();
  }

  ngAfterViewInit() {

    this.usersDataSource.sort = this.sort;
    this.usersDataSource.paginator = this.paginator;
    this.table.dataSource = this.usersDataSource;
  }

  onFilterValueChange(): void {
    this.dataTableFilter.controls.tableFilterInput.valueChanges.subscribe(value => {
     if (value.length > 1) {
       this.table.dataSource = this.usersDataSource.data.filter(option =>
         new RegExp(value, 'gi').test(option.name));
     }
    });
  }

}

