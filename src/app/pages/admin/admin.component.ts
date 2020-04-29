import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {filter, map, startWith, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AdminService} from './admin.service';
import {MatDialog} from '@angular/material/dialog';
import {DialogComponent} from '../../helpers/components/dialog/dialog.component';
import {PopupDailogComponent} from '../../helpers/components/popup-dailog/popup-dailog.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  employees: FormGroup = new FormGroup({
    fullName: new FormControl(''),
    teams: new FormControl(''),
    status: new FormControl('')
  });
  applications: FormGroup = new FormGroup({
    applicationName: new FormControl(''),
    applicationDescription: new FormControl('')
  });
  workTypeForm: FormGroup = new FormGroup({
    workType: new FormControl(''),
    workTypeDescription: new FormControl('')
  });
  statusForm: FormGroup = new FormGroup({
    statusState: new FormControl(''),
    statusName: new FormControl(''),
    statusDescription: new FormControl(''),
  });

  fullNameList: any[]  = [];
  teamList: any[]  = [];
  statusList: any[]  = [];
  applicationsList: any[]  = [];
  workTypeList: any[]  = [];
  stateTabList: any[] = [];
  statusTabList: any[]  = [];

  filteredFullName: Observable<any[]>;
  filteredTeams: Observable<any[]>;
  filteredStatus: Observable<any[]>;
  filteredApplication: Observable<any[]>;
  filteredWorkType: Observable<any[]>;
  filteredStateTabList: Observable<any[]>;
  filteredStatusTab: Observable<any[]>;

  constructor(private adminService: AdminService,
              private matDialog: MatDialog
              ) {
  }

  ngOnInit() {
    // valueChanges method, returns an observable
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


    this.filteredApplication = this.applications.controls.applicationName.valueChanges
      .pipe(
        startWith(''),
        map(application => this.filterApplications(application))
      );


    this.filteredWorkType = this.workTypeForm.controls.workType.valueChanges
      .pipe(
        startWith(''),
        map(workType => this.filterWorkType(workType))
      );

    this.filteredStateTabList = this.statusForm.controls.statusState.valueChanges
      .pipe(
        startWith(''),
        map(statusStateTab => this.filterStatusStateTab(statusStateTab))
      );

    this.filteredStatusTab = this.statusForm.controls.statusName.valueChanges
      .pipe(
        startWith(''),
        map(statusTab => this.filterStatusTab(statusTab))
      );
  }

  private filterName(value: string) {
    const dataHandle = this.adminService.getEmployees().subscribe(data => {
      this.fullNameList = data;
    });
    return this.fullNameList.filter(option => new RegExp(value).test(option.fullNames));
  }

  private filterTeams(value: string) {
    this.adminService.getTeams().subscribe(data => {
      this.teamList = data;
    });
    return this.teamList.filter(option =>  new RegExp(value).test(option.team));
  }

  private filterStatus(value: string) {
    this.adminService.getStatus().subscribe(data => {
      this.statusList = data;
    });
    return this.statusList.filter(option => new RegExp(value).test(option.statusStates));
  }

  private filterApplications(status: string) {
    this.adminService.getApplications().subscribe(data => {
      this.applicationsList = data;
    });
    return this.applicationsList.filter(option => new RegExp(status).test(option.applicationName));
  }

  private filterWorkType(value: string) {
    this.adminService.getWorkType().subscribe(data => {
      this.workTypeList = data;
    });
    return this.workTypeList.filter(option => new RegExp(value).test(option.workTypeState));
  }

  private filterStatusStateTab(value: string) {
    this.adminService.getStatusTab().subscribe(data => {
      this.stateTabList = data;
      // console.log(this.stateTabList);
     // console.log(this.statusForm.controls.statusState.value);
    });
    return this.stateTabList.filter(option => new RegExp(value).test(option.statusNames));
  }

  private filterStatusTab(value: string) {
    const statusType = this.statusForm.controls.statusState.value;
    const subscription = this.adminService.getStatusTab().subscribe(data => {
      this.statusTabList = (data.filter(statusName => statusName.statusNames === statusType))[0].statusTypes;
      // this.statusTabList = arrayData.find(typesData => typesData.state);
      console.log(this.statusTabList);
    });

    return this.statusTabList.map(option => new RegExp(value).test(option.stateType));
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
  updateApplication() {
    console.log('submitted');
    const dialogRef = this.matDialog.open(PopupDailogComponent,
      {data: {tabName: this.applications.controls.applicationName.value, name: 'Application'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  removeApplication() {
    console.log('submitted');
    const dialogRef = this.matDialog.open(DialogComponent,
      {data: {tabName:  this.applications.controls.applicationName.value, name: 'Application Name'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  updateWorkType() {
    console.log('submitted');
    const dialogRef = this.matDialog.open(PopupDailogComponent,
      {data: {tabName: this.workTypeForm.controls.workType.value, name: 'Work Type'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  removeWorkType() {
    console.log('submitted');
    const dialogRef = this.matDialog.open(DialogComponent,
      {data: {tabName: this.workTypeForm.controls.workType.value, name: 'Work Type'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  updateStatusTab() {
    console.log('submitted');
    const dialogRef = this.matDialog.open(PopupDailogComponent,
      {data: {tabName: this.statusForm.controls.statusName.value, name: 'Status'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  removeStatus() {
    console.log('submitted');
    const dialogRef = this.matDialog.open(DialogComponent,
      {data: {tabName: this.statusForm.controls.statusName.value, name: 'Status'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
