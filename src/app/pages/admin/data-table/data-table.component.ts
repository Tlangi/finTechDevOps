import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import {FormControl, FormGroup} from '@angular/forms';
import {convertRuleOptions} from 'tslint/lib/configuration';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit {
  @Input() usersFilterValue: string;
  @Input() usersTeamsFilterValue: string;
  @Input() usersStatusFilterValue: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DataTableItem>;
  usersDataSource: DataTableDataSource;

  dataTableFilter: FormGroup = new FormGroup({
    tableFilterInput: new FormControl(''),
    }
  );

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'team', 'status'];

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
      this.table.dataSource = this.usersDataSource.data.filter(option =>
        new RegExp(value, 'gi').test(option.name));
    });
  }

 /* public doFilter(value): void {
    console.log(this.dataTableFilter.controls.tableFilterInput.value);
    this.table.dataSource = this.usersDataSource.data.filter(option =>
      new RegExp(value, 'gi').test(option.name));
    if (this.usersFilterValue.length > 0) {
      this.table.dataSource = this.usersDataSource.data.filter(option =>
        new RegExp(this.usersFilterValue, 'gi').test(option.name));
    } else   if (this.usersTeamsFilterValue.length > 0) {
      this.table.dataSource = this.usersDataSource.data.filter(option =>
        new RegExp(this.usersTeamsFilterValue, 'gi').test(option.team));
    } else   if (this.usersStatusFilterValue.length > 0) {
      this.table.dataSource = this.usersDataSource.data.filter(option =>
        new RegExp(this.usersStatusFilterValue, 'gi').test(option.status));
    }
  }*/

}

