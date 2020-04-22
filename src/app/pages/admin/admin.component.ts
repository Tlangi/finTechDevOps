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

  private filterName(fullName: string) {
    this.adminService.getEmployees().subscribe(data => {
      this.fullNameList = data;
    });
    return this.fullNameList.filter(option => new RegExp(fullName).test(option.name));
  }

  private filterTeams(teams: string) {
    this.adminService.getTeams().subscribe(data => {
      this.teamList = data;
    });
    return this.teamList.filter(option =>  new RegExp(teams).test(option.team));
  }

  private filterStatus(status: string) {
    this.adminService.getStatus().subscribe(data => {
      this.statusList = data;
    });
    return this.statusList.filter(option => new RegExp(status).test(option.statusState));
  }

  private filterApplications(status: string) {
    this.adminService.getApplications().subscribe(data => {
      this.applicationsList = data;
    });
    return this.applicationsList.filter(option => new RegExp(status).test(option.applicationName));
  }

  private filterWorkType(status: string) {
    this.adminService.getWorkType().subscribe(data => {
      this.workTypeList = data;
    });
    return this.workTypeList.filter(option => new RegExp(status).test(option.workTypeState));
  }

  private filterStatusStateTab(status: string) {
    this.adminService.getStatusTab().subscribe(data => {
      this.statusStateTabList = data;
      console.log(this.statusStateTabList);
    });
    return this.statusStateTabList.filter(option => new RegExp(status).test(option.name));
  }

  private filterStatusTab(status: string) {
    this.adminService.getStatusTab().subscribe(data => {
      this.statusTabList = data.state;
      console.log(this.statusTabList);
    });
    return this.statusTabList.filter(option => new RegExp(status).test(option.name));
  }

  displayFunction(subject) {
    return subject ? subject.name : undefined;
  }

  addNewEmployee() {
    console.log('submitted');
    const user = confirm('Are you sure you want to ADD a new Employee?');
    if (user === true) {
      alert('New employee has been successfully added!!');
    }
  }
  removeEmployee() {
    console.log('submitted');
    const user = confirm('Are you sure you want to REMOVE Employee?');
    if (user === true) {
      alert('Employee has been successfully been removed!!');
    }
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
