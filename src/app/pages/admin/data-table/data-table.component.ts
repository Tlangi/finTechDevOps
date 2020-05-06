import {AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import {TeamsDataTableDatasource} from './teams-data-table-datasource';
import {EmployeesStatusDataTableDatasource} from './employeesStatus-data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() usersFullNameFilterValue: string;
  @Input() usersTeamsFilterValue: string;
  @Input() usersStatusFilterValue: string;
  @Input() employeesIndex: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DataTableItem>;
  usersFullNameDataSource: DataTableDataSource;
  usersTeamsDataSource: TeamsDataTableDatasource;
  usersStatusDataSource: EmployeesStatusDataTableDatasource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];
  dataSource = [];

  ngOnInit() {
    this.usersFullNameDataSource = new DataTableDataSource();
    this.usersTeamsDataSource = new TeamsDataTableDatasource();
    this.usersStatusDataSource = new EmployeesStatusDataTableDatasource();
  }

  ngAfterViewInit() {

    if (this.employeesIndex === 0) {
      this.usersFullNameDataSource.sort = this.sort;
      this.usersFullNameDataSource.paginator = this.paginator;
      this.table.dataSource = this.usersFullNameDataSource;
      this.dataSource = this.usersFullNameDataSource.data;
    } else if (this.employeesIndex === 1) {
      this.usersTeamsDataSource.sort = this.sort;
      this.usersTeamsDataSource.paginator = this.paginator;
      this.table.dataSource = this.usersTeamsDataSource;
      this.dataSource = this.usersTeamsDataSource.data;
    }else if (this.employeesIndex === 2) {
      this.usersStatusDataSource.sort = this.sort;
      this.usersStatusDataSource.paginator = this.paginator;
      this.table.dataSource = this.usersStatusDataSource;
      this.dataSource = this.usersStatusDataSource.data;
    }
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.doFilter();
  }

  public doFilter() {
    if (this.employeesIndex === 0) {
      if (this.usersFullNameFilterValue.length > 0) {
        this.table.dataSource = this.usersFullNameDataSource.data.filter(option =>
          new RegExp(this.usersFullNameFilterValue, 'gi').test(option.name));
      }
    }else if (this.employeesIndex === 1) {
      if (this.usersTeamsFilterValue.length > 0) {
        this.table.dataSource = this.usersTeamsDataSource.data.filter(option =>
          new RegExp(this.usersTeamsFilterValue, 'gi').test(option.name));
      }
    }else if (this.employeesIndex === 2) {
      if (this.usersStatusFilterValue.length > 0) {
        this.table.dataSource = this.usersStatusDataSource.data.filter(option =>
          new RegExp(this.usersStatusFilterValue, 'gi').test(option.name));
      }
    }
  }

}

