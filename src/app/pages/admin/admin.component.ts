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

  fullNameList: string[] = ['One', 'Two', 'Three'];
  teamList: string[] = ['FinTech Developers', 'FinTech Testers', 'App Support', 'Production Support', 'Oracle'];
  statusList: string[] = ['Active', 'Inactive'];
  filteredOptions: Observable<string[]>;

  ngOnInit() {
    this.filteredOptions = this.employees.controls.teams.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value))
      );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toUpperCase();

    return this.teamList.filter(option => option.toUpperCase().includes(filterValue));
  }

  onSubmit() {
    console.log('submitted');
  }

}
