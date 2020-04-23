import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {AdminService} from './admin.service';

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
  statusStateTabList: any[] = [];
  statusTabList: any[]  = [];

  filteredFullName: Observable<any[]>;
  filteredTeams: Observable<any[]>;
  filteredStatus: Observable<any[]>;
  filteredApplication: Observable<any[]>;
  filteredWorkType: Observable<any[]>;
  filteredStatusTab: Observable<any[]>;
  filteredStatusStateTab: Observable<any[]>;

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.filteredFullName = this.employees.controls.fullName.valueChanges
      .pipe(
        startWith(''),
        map(fullName => this.filterName(fullName))
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


    this.filteredStatusTab = this.statusForm.controls.statusName.valueChanges
      .pipe(
        startWith(''),
        map(statusTab => this.filterStatusTab(statusTab))
      );
    this.filteredStatusStateTab = this.statusForm.controls.statusState.valueChanges
      .pipe(
        startWith(''),
        map(statusStateTab => this.filterStatusStateTab(statusStateTab))
      );
  }

  private filterName(value: string) {
    this.adminService.getEmployees().subscribe(data => {
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
      this.statusStateTabList = data;
      console.log(this.statusForm.controls.statusState.value);
    });
    return this.statusStateTabList.filter(option => new RegExp(value).test(option.state));
  }

  private filterStatusTab(status: string) {
    const statusType = this.statusForm.controls.statusState.value;
    if (statusType === 'Project State') {
      this.adminService.getStatusTab().subscribe(data => {
        this.statusTabList = data.filter(statusType);
        console.log(this.statusTabList);
      });
      return this.statusTabList.filter(option => new RegExp(status).test(option.state));
    } else if (statusType === 'Approval State') {
      this.adminService.getStatusTab().subscribe(data => {
        this.statusTabList = data.approvalState;
        console.log(this.statusTabList);
      });
      return this.statusTabList.filter(option => new RegExp(status).test(option.state));
    } else if (statusType === 'State of Emergency') {
      this.adminService.getStatusTab().subscribe(data => {
        this.statusTabList = data.levelState;
        console.log(this.statusTabList);
      });
      return this.statusTabList.filter(option => new RegExp(status).test(option.state));
    }
  }

  addNewEmployee() {
    console.log('submitted');
  }
  removeEmployee() {
    console.log('submitted');
  }
  updateApplication() {
    console.log('submitted');
    const application = confirm('Are you sure you want to UPDATE this Application?');
    if (application === true) {
      alert('the following application has been updated ' + this.applications.controls.applicationName.value
        + ' successfully');
    }
  }
  removeApplication() {
    console.log('submitted');
    const application = confirm('Are you sure you want to REMOVE this Application?');
    if (application === true) {
      alert('the following application has been removed ' + this.applications.controls.applicationName.value
        + ' successfully');
    }
  }
  updateWorkType() {
    console.log('submitted');
    const workType = confirm('Are you sure you want to UPDATE this Work Type?');
    if (workType === true) {
      alert('the following application has been updated ' + this.workTypeForm.controls.workType.value
        + ' successfully');
    }
  }
  removeWorkType() {
    console.log('submitted');
    const workType = confirm('Are you sure you want to REMOVE this Work Type?');
    if (workType === true) {
      alert('the following application has been removed ' + this.workTypeForm.controls.workType.value
        + ' successfully');
    }
  }
  updateStatusTab() {
    console.log('submitted');
    const status = confirm('Are you sure you want to UPDATE this Status?');
    if (status === true) {
      alert('the following application has been updated ' + this.statusForm.controls.statusName.value
        + ' successfully');
    }
  }
  removeStatus() {
    console.log('submitted');
    const status = confirm('Are you sure you want to REMOVE this Status?');
    if (status === true) {
      alert('the following application has been removed ' + this.statusForm.controls.statusName.value
        + ' successfully');
    }
  }

}
