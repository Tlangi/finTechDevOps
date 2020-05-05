import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {AdminService} from '../admin.service';
import {MatDialog} from '@angular/material/dialog';
import {PopupDailogComponent} from '../../../helpers/components/popup-dailog/popup-dailog.component';
import {DialogComponent} from '../../../helpers/components/dialog/dialog.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {

  employees: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    teams: new FormControl(''),
    status: new FormControl('')
  });
  private subs: Subscription;
  fullNameList: any[]  = [];
  teamList: any[]  = [];
  statusList: any[]  = [];

  filteredFullName: Observable<any[]>;
  filteredTeams: Observable<any[]>;
  filteredStatus: Observable<any[]>;
  constructor(private adminService: AdminService,
              private matDialog: MatDialog) {
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
    this.subs = this.adminService.getEmployees().subscribe(data => {
      this.fullNameList = data;
    });
    if (value.length >= 2) {
      return this.fullNameList.filter(option => new RegExp(value, 'gi').test(option.fullNames));
    }

  }

  private filterTeams(value: string) {
    this.subs = this.adminService.getTeams().subscribe(data => {
      this.teamList = data;
    });
    if (value.length >= 2) {
      return this.teamList.filter(option =>  new RegExp(value, 'gi').test(option.team));
    }
  }

  private filterStatus(value: string) {
    this.subs = this.adminService.getStatus().subscribe(data => {
      this.statusList = data;
    });
    if (value.length >= 2) {
      return this.statusList.filter(option => new RegExp(value, 'gi').test(option.statusStates));
    }
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