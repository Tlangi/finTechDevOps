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

  fullNameList  = [
    /* {id: 1, name: 'Tlangelani Maswanganye'},
    {id: 2, name: 'Happy Smith'},
    {id: 3, name: 'Jerry Zoom'}*/
  ];

  teamList = [
    /*{id: 1, name: 'FinTech Developers'},
    {id: 2, name: 'FinTech Testers'},
    {id: 3, name: 'App Support'},
    {id: 4, name: 'Production Support'},
    {id: 5, name: 'Oracle'}*/
    ];

  statusList = [
   /* {id: 1, name: 'Active'},
    {id: 2, name: 'Inactive'} */
    ];

  filteredFullName: Observable<any[]>;
  filteredTeams: Observable<any[]>;
  filteredStatus: Observable<any[]>;

  constructor(private adminService: AdminService) {
  }

  ngOnInit() {
    this.adminService.fetchData();
    this.filteredFullName = this.employees.controls.fullName.valueChanges
      .pipe(
        startWith(''),
        map(fullName => this.adminService.filterName(fullName))
      );

    this.filteredTeams = this.employees.controls.teams.valueChanges
      .pipe(
        startWith(''),
        map(teams => this.adminService.filterTeams(teams))
      );

    this.filteredStatus = this.employees.controls.status.valueChanges
      .pipe(
        startWith(''),
        map(status => this.adminService.filterStatus(status))
      );
  }

  /*private filterName(fullName: string) {
    return this.fullNameList.filter(option => new RegExp(fullName).test(option.name));
  }

  private filterTeams(teams: string) {
    return this.teamList.filter(option =>  new RegExp(teams).test(option.name));
  }

  private filterStatus(status: string) {
    return this.statusList.filter(option => new RegExp(status).test(option.name));
  } */

  displayFunction(subject) {
    return subject ? subject.name : undefined;
  }

  onSubmit() {
    console.log('submitted');
  }

}
