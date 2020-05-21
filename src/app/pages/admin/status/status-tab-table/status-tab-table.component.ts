import {AfterViewInit, Component, Input, OnInit, ViewChild} from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { StatusTabTableDataSource, StatusTabTableItem } from './status-tab-table-datasource';
import {FormControl, FormGroup} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
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

  step: number;
  index: number;
  stateOfEmergency: any[] = [];
  approvalState: any[] = [];
  projectList: any[] = [];

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedSubColumns = ['id', 'status', 'description', 'action'];
  approvalStateForm: FormGroup = new FormGroup({
      approval: new FormControl(''),
    }
  );
  emergencyState: FormGroup = new FormGroup({
      emergency: new FormControl(''),
    }
  );
  projectState: FormGroup = new FormGroup({
      project: new FormControl(''),
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
    this.dataSource.data.filter((statusType) => {
      if (statusType.status === rowObject.status) {
        const index = statusType.statusType.length;
        statusType.statusType.push({
          subId: index + 1,
          subStatus: rowObject.statusType,
          description: rowObject.statusTypeDescription
          }
        );
      }
    });
    this.table.renderRows();
  }

  updateRowData(rowObject) {
    this.dataSource.data =  this.dataSource.data.filter((value) => {
      value.statusType.filter((statusType) => {
        if (statusType.subStatus === rowObject.statusType && statusType.subId === rowObject.statusId) {
          statusType.subStatus = rowObject.statusType;
          statusType.description = rowObject.statusTypeDescription;
        }
      });
      return true;
    });
  }

  deleteRowData(rowObject) {
    this.dataSource.data = this.dataSource.data.filter((value) => {
      value.statusType.filter((statusType) => {
        if (statusType.subStatus === rowObject.statusType && statusType.subId === rowObject.statusId) {
          return statusType.subId !== rowObject.id;
        }
      });
    });
  }

  ngOnInit() {
    this.dataSource.data.filter((status) => {
      if (status.id === 2) {
        this.approvalState = status.statusType;
      } else if (status.id === 1) {
        this.stateOfEmergency = status.statusType;
      } else if (status.id === 3) {
        this.projectList = status.statusType;
      }
    });
    this.filterEmergencyState();
    this.filterApprovalState();
    this.filterProjectState();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  private filterEmergencyState() {
    this.emergencyState.controls.emergency.valueChanges.subscribe(value => {
      if (value.length > 0) {
        this.dataSource.data.filter((status) => {
          if (status.id === 1) {
            this.stateOfEmergency = status.statusType.filter(option => {
              return !!JSON.stringify(Object.values(option)).match(new RegExp(value, 'gi'));
            });
          }
        });
      } else {
        this.dataSource.data.filter((status) => {
          if (status.id === 1) {
            this.stateOfEmergency = status.statusType;
          }
        });
      }
    });
  }

  private filterApprovalState() {
    this.approvalStateForm.controls.approval.valueChanges.subscribe(value => {
      if (value.length > 0) {
        this.dataSource.data.filter((status) => {
          if (status.id === 2) {
            this.approvalState = status.statusType.filter(option => {
              return !!JSON.stringify(Object.values(option)).match(new RegExp(value, 'gi'));
            });
          }
        });
      } else {
        this.dataSource.data.filter((status) => {
          if (status.id === 2) {
            this.approvalState = status.statusType;
          }
        });
      }
    });
  }

  private filterProjectState() {
    this.projectState.controls.project.valueChanges.subscribe(value => {
      if (value.length > 0) {
        this.dataSource.data.filter((status) => {
          if (status.id === 3) {
            this.projectList = status.statusType.filter(option => {
              return !!JSON.stringify(Object.values(option)).match(new RegExp(value, 'gi'));
            });
          }
        });
      } else {
        this.dataSource.data.filter((status) => {
          if (status.id === 3) {
            this.projectList = status.statusType;
          }
        });
      }
    });
  }
}
