import {AfterViewInit, Component, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { DataTableDataSource, DataTableItem } from './data-table-datasource';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.css']
})
export class DataTableComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() filterValue: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<DataTableItem>;
  dataSource: DataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new DataTableDataSource();
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
    console.log('Value in the table: ' + this.filterValue);
    if (this.filterValue.length > 0) {
      console.log('Value in the table inside loop: ' + this.filterValue);
      this.table.dataSource = this.dataSource.data.filter(option => new RegExp(this.filterValue, 'gi').test(option.name));
    }
  }
}
