import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { WorkTypeDataTableDataSource, WorkTypeDataTableItem } from './work-type-data-table-datasource';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {WorkTypeComponent} from '../work-type.component';

@Component({
  selector: 'app-work-type-data-table',
  templateUrl: './work-type-data-table.component.html',
  styleUrls: ['./work-type-data-table.component.css']
})
export class WorkTypeDataTableComponent implements AfterViewInit, OnInit {
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
    const dialogRef = this.dialog.open(WorkTypeComponent, {
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
    const index = this.dataSource.data.length;
    this.dataSource.data.push({
      id: index + 1,
      name: rowObject.workType,
      description: rowObject.workTypeDescription
    });
    this.table.renderRows();
  }

  updateRowData(rowObject) {
    this.dataSource.data =  this.dataSource.data.filter((value) => {
      if (value.name === rowObject.workType) {
        value.name = rowObject.workType;
        value.description = rowObject.workTypeDescription;
      }
      return true;
    });
  }

  deleteRowData(rowObject) {
    this.dataSource.data = this.dataSource.data.filter((value) => {
      return value.name !== rowObject.workType;
    });
  }


  ngOnInit() {
    this.dataSource = new WorkTypeDataTableDataSource();
    this.onFilterValueChange();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }

  onFilterValueChange() {
    this.dataTableFilter.controls.tableFilterInput.valueChanges.subscribe(input => {
      if (input.length > 1) {
        // This will filter through the whole object and return the results that meets the conditions
        this.table.dataSource = this.dataSource.data.filter( option => {
          return !!JSON.stringify(Object.values(option)).match(new RegExp(input, 'gi'));
        }).slice(0, 5);
      } else {
        this.table.dataSource = this.dataSource;
      }
    });
  }
}
