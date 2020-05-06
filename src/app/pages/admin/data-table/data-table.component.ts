import {AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';
import {ApplicationsTableDataSource} from '../applications/applications-table/applications-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() usersFullNameFilterValue: string;
  // @Input() applicationsFilterValue: string;
  // @Input() mainTabIndex: number;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DataTableItem>;
  usersFullNameDataSource: DataTableDataSource;
  // applicationsDataSource: ApplicationsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.usersFullNameDataSource = new DataTableDataSource();
    // this.applicationsDataSource = new ApplicationsTableDataSource();
  }

  ngAfterViewInit() {
    this.usersFullNameDataSource.sort = this.sort;
    this.usersFullNameDataSource.paginator = this.paginator;
    this.table.dataSource = this.usersFullNameDataSource;
    /* if (this.mainTabIndex === 0) {
      this.usersFullNameDataSource.sort = this.sort;
      this.usersFullNameDataSource.paginator = this.paginator;
      this.table.dataSource = this.usersFullNameDataSource;
    } else if (this.mainTabIndex === 1) {
      this.applicationsDataSource.sort = this.sort;
      this.applicationsDataSource.paginator = this.paginator;
      this.table.dataSource = this.applicationsDataSource;
    }*/
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.doFilter();
  }

  public doFilter() {
    if (this.usersFullNameFilterValue.length > 0) {
      // console.log('Value in the table inside loop: ' + this.usersFullNameFilterValue);
      this.table.dataSource = this.usersFullNameDataSource.data.filter(option =>
        new RegExp(this.usersFullNameFilterValue, 'gi').test(option.name));
    }
  }
   /* if (this.mainTabIndex === 0) {
      if (this.usersFullNameFilterValue.length > 0) {
        // console.log('Value in the table inside loop: ' + this.usersFullNameFilterValue);
        this.table.dataSource = this.usersFullNameDataSource.data.filter(option =>
          new RegExp(this.usersFullNameFilterValue, 'gi').test(option.name));
      }
    }else if (this.mainTabIndex === 1) {
      if (this.applicationsFilterValue.length > 0) {
        // console.log('Value in the table inside loop: ' + this.usersFullNameFilterValue);
        this.table.dataSource = this.applicationsDataSource.data.filter(option =>
          new RegExp(this.applicationsFilterValue, 'gi').test(option.name));
      }
    }    */

}

