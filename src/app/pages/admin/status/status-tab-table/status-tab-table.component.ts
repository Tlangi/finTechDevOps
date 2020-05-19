import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { StatusTabTableDataSource, StatusTabTableItem } from './status-tab-table-datasource';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {EmployeesComponent} from '../../employees/employees.component';
import {StatusComponent} from '../status.component';

@Component({
  selector: 'app-status-tab-table',
  templateUrl: './status-tab-table.component.html',
  styleUrls: ['./status-tab-table.component.css']
})
export class StatusTabTableComponent implements AfterViewInit, OnInit {
  @Input() statusValueChange: string;
  @Input() subStatusValueChange: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<StatusTabTableItem>;
  dataSource: StatusTabTableDataSource;

  step = 0;
  index: number;
  stateOfEmergency: any[] = [];
  approvalState: any[] = [];
  projectList: any[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'status', 'statusType', 'action'];
  displayedSubColumns = ['id', 'status', 'description', 'action'];
  dataTableFilter: FormGroup = new FormGroup({
      tableFilterInput: new FormControl(''),
    }
  );

  constructor(public dialog: MatDialog) {
    this.dataSource = new StatusTabTableDataSource();
  }

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  openDialog(action, obj) {
    obj.action = action;
    const dialogRef = this.dialog.open(StatusComponent, {
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
      status: rowObject.status,
      statusType: rowObject.statusType,
    });
    this.table.renderRows();
  }

  updateRowData(rowObject) {
    this.dataSource.data =  this.dataSource.data.filter((value, key) => {
      if (value.id === rowObject.id) {
        value.status = rowObject.status;
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
    this.dataSource.data.filter((status, key) => {
      if (status.id === 2) {
        this.approvalState = status.statusType.slice(0, 5);
        console.log(status.statusType);
      } else if (status.id === 1) {
        this.stateOfEmergency = status.statusType.slice(0, 5);
        console.log(status.statusType);
      } else if (status.id === 3) {
        this.projectList = status.statusType.slice(0, 4);
        console.log(status.statusType);
      }
    });
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }
}
