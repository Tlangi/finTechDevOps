import {Component, EventEmitter, Inject, OnInit, Optional, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {PopupDailogComponent} from '../../../helpers/components/popup-dailog/popup-dailog.component';
import {DialogComponent} from '../../../helpers/components/dialog/dialog.component';
import {DataTableDataSource} from '../data-table/data-table-datasource';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  @Output() sendFullNameFilterValue = new EventEmitter<string>();
  @Output() sendTeamsFilterValue = new EventEmitter<string>();
  @Output() sendStatusFilterValue = new EventEmitter<string>();
  dataSource: DataTableDataSource;

  employees: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    teams: new FormControl(''),
    status: new FormControl('')
  });
  fullName: string;
  teams: string;
  status: string;

  fullNameList: any[]  = [];
  teamList: any[]  = [];
  statusList: any[] = [];
  action: string;

  filteredFullName: Observable<any[]>;
  filteredTeams: Observable<any[]>;
  filteredStatus: Observable<any[]>;
  constructor(private dialogRef: MatDialogRef<EmployeesComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) data) {
    this.dataSource = new DataTableDataSource();
    this.fullName = data.name;
    this.teams = data.team;
    this.status = data.status;
    this.action = data.action;
  }

  ngOnInit(): void {
    this.employees.setValue({
      fullName: this.fullName,
      teams: this.teams,
      status: this.status,
    });
    this.filteredFullName = this.employees.controls.fullName.valueChanges
      .pipe(
        startWith(''),
        map(fullName => this.filterName(fullName)),
        // take(4)
      );

    this.filteredTeams = this.employees.controls.teams.valueChanges
      .pipe(
        startWith(''),
        map(teams => this.filterTeams(teams))
      );

    this.filteredStatus = this.employees.controls.status.valueChanges
      .pipe(
        startWith(''),
        map(status => this.filterStatus(status))
      );

  }

  doAction(): void {
    this.dialogRef.close({event: this.action, data: this.employees.value});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  private filterName(value: string) {
    this.sendFullNameFilterValue.emit(value);
    this.fullNameList = this.dataSource.data;
    if (value.length >= 2) {
      this.employees.controls.teams.setValue(
        this.fullNameList.filter(option =>
          new RegExp(value, 'gi').test(option.name))[0].team
      );
      this.employees.controls.status.setValue(
        this.fullNameList.filter(option =>
          new RegExp(value, 'gi').test(option.name))[0].status
      );
      return this.fullNameList.filter(option => new RegExp(value, 'gi').test(option.name));
    } else {
      this.employees.controls.teams.setValue(
        ''
      );
      this.employees.controls.status.setValue(
        ''
      );
      return;
    }

  }

  private filterTeams(value: string) {
      this.sendTeamsFilterValue.emit(value);
      this.teamList = this.dataSource.data;
      if (value.length >= 2) {
        return this.teamList.filter(option =>  new RegExp(value, 'gi').test(option.team));
      }
  }

  private filterStatus(value: string) {
    this.sendStatusFilterValue.emit(value);
    this.statusList = this.dataSource.data;
    if (value.length >= 2) {
      return this.statusList.filter(option => new RegExp(value, 'gi').test(option.status));
    }
  }

}
