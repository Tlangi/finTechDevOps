import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { ApplicationsTableDataSource, ApplicationsTableItem } from './applications-table-datasource';

@Component({
  selector: 'app-applications-table',
  templateUrl: './applications-table.component.html',
  styleUrls: ['./applications-table.component.css']
})
export class ApplicationsTableComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() applicationFilterValue: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ApplicationsTableItem>;
  dataSource: ApplicationsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name', 'description'];

  ngOnInit() {
    this.dataSource = new ApplicationsTableDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.doFilter();
  }

  public doFilter() {
    if (this.applicationFilterValue.length > 0) {
      // console.log('Value in the table inside loop: ' + this.usersFullNameFilterValue);
      this.table.dataSource = this.dataSource.data.filter(option =>
        new RegExp(this.applicationFilterValue, 'gi').test(option.name));
    }
  }
}
