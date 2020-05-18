import {Component, EventEmitter, Inject, OnChanges, OnInit, Optional, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DataTableDataSource} from './data-table/data-table-datasource';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit, OnChanges {
  @Output() sendFullNameFilterValue = new EventEmitter<string>();
  @Output() sendTeamsFilterValue = new EventEmitter<string>();
  @Output() sendStatusFilterValue = new EventEmitter<string>();
  dataSource: DataTableDataSource;
  nameExist = false;

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

  private filterFunction(): void {

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
  private checkAction() {
    if (this.action === 'Update') {
      this.employees.setValue({
        fullName: this.fullName,
        teams: this.teams,
        status: this.status,
      });
    } else if (this.action === 'Delete') {
      this.employees.setValue({
        fullName: this.fullName,
        teams: this.teams,
        status: this.status,
      });
    } /* else if (this.action === 'Add') {
      const value: string = this.employees.controls.fullName.value;
      this.fullNameList = this.dataSource.data;
      if (value.length >= 2) {
        console.log(value);
        console.log(this.fullNameList.filter(option => new RegExp(value, 'gi').test(option.name)));
      } else {
        this.fullNameList = this.dataSource.data;
      }
    }*/
  }
  ngOnInit(): void {
    this.checkAction();
    this.filterFunction();
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  doAction(): void {
    this.dialogRef.close({event: this.action, data: this.employees.value});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  private filterTeams(value: string) {
      this.teamList = this.dataSource.data;
      if (value.length >= 2) {
        if (this.action === 'Add') {
          this.dataSource.data.filter((name, key) => {
            if (name.name === this.employees.controls.fullName.value) {
              this.nameExist = true;
            }
          });
        }
        return this.teamList.filter(option =>  new RegExp(value, 'gi').test(option.team));
      } else {
        this.nameExist = false;
      }
  }

  private filterStatus(value: string) {
    this.statusList = this.dataSource.data;
    if (value.length >= 2) {
      return this.statusList.filter(option => new RegExp(value, 'gi').test(option.status));
    }
  }

}
