import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {TasksUpdateDataSource} from '../tasks-update/tasks-update-datasource';

@Component({
  selector: 'app-task-allocation',
  templateUrl: './task-allocation.component.html',
  styleUrls: ['./task-allocation.component.css']
})
export class TaskAllocationComponent implements OnInit {

  dataSource: TasksUpdateDataSource;

  taskAllocationForm: FormGroup = new FormGroup({
    employeeName: new FormControl('', [Validators.required]),
    systemOrProject: new FormControl('', [Validators.required]),
    taskName: new FormControl('', [Validators.required]),
    taskDescription: new FormControl('', [Validators.required]),
    typeOfWork: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    dateCreated: new FormControl(''),
    expectedReleaseDate: new FormControl('', [Validators.required]),
  });

  employeeNameList: any[] = [];
  systemOrProjectList: any[] = [];
  typeOfWorkList: any[] = [];
  priorityList: any[] = [];
  statusList: any[] = [];

  filterEmployeeNameList: Observable<any[]>;
  filterSystemOrProjectList: Observable<any[]>;
  filterTypeOfWorkList: Observable<any[]>;
  filterPriorityList: Observable<any[]>;
  filteredStatusList: Observable<any[]>;

  constructor() {
    this.dataSource = new TasksUpdateDataSource();
  }

  ngOnInit(): void {
    this.filterEmployeeNameList = this.taskAllocationForm.controls.employeeName.valueChanges
      .pipe(
        startWith(''),
        map(employeeName => this.filterEmployeeName(employeeName))
      );
  }

  private filterEmployeeName(value: string) {
    this.employeeNameList = this.dataSource.data;
    if (value.length > 2) {
      return this.employeeNameList.filter(option => new RegExp(value, 'gi').test(option.employeeName));
    }
  }

}
