import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { WorkTypeDataTableDataSource, WorkTypeDataTableItem } from './work-type-data-table-datasource';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {AdminDialogBoxComponent} from '../../admin-dialog-box/admin-dialog-box.component';

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
  displayedColumns = ['id', 'name', 'description', 'action'];
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
      name: rowObject.name,
      description: rowObject.description
    });
    this.table.renderRows();
  }

  updateRowData(rowObject) {
    this.dataSource.data =  this.dataSource.data.filter((value, key) => {
      if (value.id === rowObject.id) {
        value.name = rowObject.name;
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
