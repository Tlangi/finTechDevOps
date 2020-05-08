import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDialog} from '@angular/material/dialog';
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
  fullNameList: any[]  = [];
  teamList: any[]  = [];
  statusList: any[] = [];
  listHandler: any[] = [];

  filteredFullName: Observable<any[]>;
  filteredTeams: Observable<any[]>;
  filteredStatus: Observable<any[]>;
  constructor(private matDialog: MatDialog) {
    this.dataSource = new DataTableDataSource();
  }

  ngOnInit(): void {
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

  private filterName(value: string) {
    this.sendFullNameFilterValue.emit(value);
    this.fullNameList = this.dataSource.data;
    if (value.length >= 2) {
      this.employees.controls.teams.setValue(
        'Testing'
      );
      this.employees.controls.status.setValue(
        'Testing'
      );
      return this.fullNameList.filter(option => new RegExp(value, 'gi').test(option.name));
    }

  }

  private filterTeams(value: string) {
      this.sendTeamsFilterValue.emit(value);
      this.teamList = this.dataSource.data;
      if (value.length >= 2) {
        return this.teamList.filter(option =>  new RegExp(value, 'gi').test(option.team));
      }

    /* if (this.employees.controls.fullName.value === '') {
    } else {
      console.log(this.listHandler);
      return this.teamList.filter(option =>  new RegExp(value, 'gi').test(option.team));
    }*/
  }

  private filterStatus(value: string) {
    this.sendStatusFilterValue.emit(value);
    this.statusList = this.dataSource.data;
    if (value.length >= 2) {
      return this.statusList.filter(option => new RegExp(value, 'gi').test(option.status));
    }
   /* if (this.employees.controls.fullName.value === '') {
   } else {
     return this.teamList.filter(option =>  new RegExp(value, 'gi').test(option.status));
   }*/
  }

  addNewEmployee() {
    console.log('submitted');
    const dialogRef = this.matDialog.open(PopupDailogComponent,
      {data: {tabName: this.employees.controls.fullName.value, name: 'Employees'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  removeEmployee() {
    console.log('submitted');
    const dialogRef = this.matDialog.open(DialogComponent,
      {data: {tabName: this.employees.controls.fullName.value, name: 'Employees'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
