import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-task-allocation',
  templateUrl: './task-allocation.component.html',
  styleUrls: ['./task-allocation.component.css']
})
export class TaskAllocationComponent implements OnInit {

  taskAllocationForm: FormGroup = new FormGroup({
    employeeName: new FormControl(),
    systemOrProject: new FormControl(),
    taskName: new FormControl(),
    taskDescription: new FormControl(),
    typeOfWork: new FormControl(),
    priority: new FormControl(),
    jira: new FormControl(),
    story: new FormControl(),
    status: new FormControl(),
    dateCreated: new FormControl(),
    taskStartDate: new FormControl(),
    taskEndDate: new FormControl(),
    expectedReleaseDate: new FormControl(),
    comments: new FormControl(),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
