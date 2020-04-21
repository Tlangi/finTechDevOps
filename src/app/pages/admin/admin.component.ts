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

  fullNameList: string[] = [
    {name: 'One'},
    {name: 'Two'},
    {name: 'Three'}
  ];

  teamList: string[] = [
    {name: 'FinTech Developers'},
    {name: 'FinTech Testers'},
    {name: 'App Support'},
    {name: 'Production Support'},
    {name: 'Oracle'}
    ];

  statusList: string[] = [
    {name: 'Active'},
    {name: 'Inactive'}
    ];

  filteredFullName: Observable<string[]>;
  filteredTeams: Observable<string[]>;
  filteredStatus: Observable<string[]>;

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

  private filterName(fullName: string): string[] {
    const filterValue = fullName.toUpperCase();

    return this.fullNameList.filter(option => option.toUpperCase().includes(filterValue));
  }

  private filterTeams(teams: string): string[] {
    const filterValue = teams.toUpperCase();

    return this.teamList.filter(option => option.toUpperCase().includes(filterValue));
  }

  private filterStatus(status: string): string[] {
    const filterValue = status.toUpperCase();

    return this.statusList.filter(option => option.toUpperCase().includes(filterValue));
  }

  onSubmit() {
    console.log('submitted');
  }

}
