import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {map, startWith} from 'rxjs/operators';
import {Observable} from 'rxjs';

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
    {name: 'One'},
    {name: 'Two'},
    {name: 'Three'}
  ];

  teamList = [
    {name: 'FinTech Developers'},
    {name: 'FinTech Testers'},
    {name: 'App Support'},
    {name: 'Production Support'},
    {name: 'Oracle'}
    ];

  statusList = [
    {name: 'Active'},
    {name: 'Inactive'}
    ];

  filteredFullName: Observable<any[]>;
  filteredTeams: Observable<any[]>;
  filteredStatus: Observable<any[]>;

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
  }

  private filterName(fullName: string) {
    const filterValue = fullName.toUpperCase();

    return this.fullNameList.filter(option => new RegExp(fullName, '').test(option.name));
  }

  private filterTeams(teams: string) {
    const filterValue = teams.toUpperCase();

    return this.teamList.filter(option =>  new RegExp(teams).test(option.name));
    // return this.teamList.filter(option => option.toUpperCase().includes(filterValue));
  }

  private filterStatus(status: string) {
    const filterValue = status.toUpperCase();

    return this.statusList.filter(option => new RegExp(status).test(option.name));
  }

  displayFunction(subject) {
    return subject ? subject.name : undefined;
  }

  onSubmit() {
    console.log('submitted');
  }

}
