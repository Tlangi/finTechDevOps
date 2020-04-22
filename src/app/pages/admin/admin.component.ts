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
    statusName: new FormControl(''),
    statusDescription: new FormControl(''),
  });

  fullNameList: any[]  = [];
  teamList: any[]  = [];
  statusList: any[]  = [];
  applicationsList: any[]  = [];
  workTypeList: any[]  = [];
  statusTabList: any[]  = [];

  filteredFullName: Observable<any[]>;
  filteredTeams: Observable<any[]>;
  filteredStatus: Observable<any[]>;
  filteredApplication: Observable<any[]>;
  filteredWorkType: Observable<any[]>;
  filteredStatusTab: Observable<any[]>;

  constructor(private adminService: AdminService) {
    this.fetchData();
  }

  fetchData() {

    this.adminService.getEmployees().subscribe(data => {
      this.fullNameList = [data];
      console.log(this.fullNameList);
    });

    this.adminService.getTeams().subscribe(data => {
      this.teamList = [data];
      console.log(this.teamList);
    });

    this.adminService.getStatus().subscribe(data => {
      this.statusList = [data];
      console.log(this.statusList);
    });
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
    // console.log(this.filteredFullName);

    this.filteredStatus = this.employees.controls.status.valueChanges
      .pipe(
        startWith(''),
        map(status => this.filterStatus(status))
      );
  }

  private filterName(fullName: string) {
    console.log(fullName);
    if (!fullName === null) {
      return this.fullNameList.filter(option => new RegExp(fullName).test(option.name));
    }
  }

  private filterTeams(teams: string) {
    return this.teamList.filter(option =>  new RegExp(teams).test(option.name));
  }

  private filterStatus(status: string) {
    return this.statusList.filter(option => new RegExp(status).test(option.name));
  }

  displayFunction(subject) {
    return subject ? subject.name : undefined;
  }

  addNewEmployee() {
    console.log('submitted');
    const newUser = confirm('Are you sure you want to ADD a new Employee?');
    alert(newUser);
  }

  removeEmployee() {
    console.log('submitted');
    const newUser = confirm('Are you sure you want to REMOVE Employee?');
    alert(newUser);
  }
  updateApplication() {
    console.log('submitted');
    const newUser = confirm('Are you sure you want to UPDATE this Application?');
    alert(newUser);
  }
  removeApplication() {
    console.log('submitted');
    const newUser = confirm('Are you sure you want to REMOVE this Application?');
    alert(newUser);
  }
  updateWorkType() {
    console.log('submitted');
    const newUser = confirm('Are you sure you want to UPDATE this Work Type?');
    alert(newUser);
  }
  removeWorkType() {
    console.log('submitted');
    const newUser = confirm('Are you sure you want to UPDATE this Work Type?');
    alert(newUser);
  }
  updateStatusTab() {
    console.log('submitted');
    const newUser = confirm('Are you sure you want to UPDATE this Status?');
    alert(newUser);
  }
  removeStatus() {
    console.log('submitted');
    const newUser = confirm('Are you sure you want to UPDATE this Status?');
    alert(newUser);
  }

}
