import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { StatusTabTableDataSource, StatusTabTableItem } from './status-tab-table-datasource';

@Component({
  selector: 'app-status-tab-table',
  templateUrl: './status-tab-table.component.html',
  styleUrls: ['./status-tab-table.component.css']
})
export class StatusTabTableComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() statusValueChange: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<StatusTabTableItem>;
  dataSource: StatusTabTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

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
  }

  public doFilter() {
    if (this.statusValueChange.length > 0) {
      this.table.dataSource = this.dataSource.data.filter(option =>
        new RegExp(this.statusValueChange, 'gi').test(option.name));
    }
  }
}