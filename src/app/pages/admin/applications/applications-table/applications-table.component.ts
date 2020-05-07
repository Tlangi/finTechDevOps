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
  @Input() title: string;
  @Input() tabIndex: number;
  @Input() applicationFilterValue: string;
  @Input() workTypeFilterValue: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<ApplicationsTableItem>;
  dataSource: ApplicationsTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new ApplicationsTableDataSource();
  }

  ngAfterViewInit() {
   if (this.tabIndex === 1) {
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
     this.table.dataSource = this.dataSource;
   } else if (this.tabIndex === 2) {
     this.dataSource.sort = this.sort;
     this.dataSource.paginator = this.paginator;
     this.table.dataSource = this.dataSource;
   }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.doFilter();
  }

  public doFilter() {
    if (this.tabIndex === 1) {
      if (this.applicationFilterValue.length > 0) {
        // console.log('Value in the table inside loop: ' + this.usersFullNameFilterValue);
        this.table.dataSource = this.dataSource.data.filter(option =>
          new RegExp(this.applicationFilterValue, 'gi').test(option.name));
      }
    } else if (this.tabIndex === 2) {
      if (this.workTypeFilterValue.length > 0) {
        // console.log('Value in the table inside loop: ' + this.usersFullNameFilterValue);
        this.table.dataSource = this.dataSource.data.filter(option =>
          new RegExp(this.workTypeFilterValue, 'gi').test(option.name));
      }
    }
  }
}