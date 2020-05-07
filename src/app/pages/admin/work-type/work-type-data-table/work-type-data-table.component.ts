import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { WorkTypeDataTableDataSource, WorkTypeDataTableItem } from './work-type-data-table-datasource';

@Component({
  selector: 'app-work-type-data-table',
  templateUrl: './work-type-data-table.component.html',
  styleUrls: ['./work-type-data-table.component.css']
})
export class WorkTypeDataTableComponent implements AfterViewInit, OnInit, OnChanges {
  @Input() workTypeFilterValue: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<WorkTypeDataTableItem>;
  dataSource: WorkTypeDataTableDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'name'];

  ngOnInit() {
    this.dataSource = new WorkTypeDataTableDataSource();
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
    if (this.workTypeFilterValue.length > 0) {
      this.table.dataSource = this.dataSource.data.filter(option =>
        new RegExp(this.workTypeFilterValue, 'gi').test(option.name));
    }
  }
}
