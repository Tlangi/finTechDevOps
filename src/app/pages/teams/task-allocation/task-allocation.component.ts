import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-task-allocation',
  templateUrl: './task-allocation.component.html',
  styleUrls: ['./task-allocation.component.css']
})
export class TaskAllocationComponent implements OnInit {

  taskAllocationForm: FormGroup = new FormGroup({
    employeeName: new FormControl('', [Validators.required]),
    systemOrProject: new FormControl('', [Validators.required]),
    taskName: new FormControl('', [Validators.required]),
    taskDescription: new FormControl('', [Validators.required]),
    typeOfWork: new FormControl('', [Validators.required]),
    priority: new FormControl('', [Validators.required]),
    jira: new FormControl('', [Validators.required]),
    status: new FormControl('', [Validators.required]),
    dateCreated: new FormControl(''),
    expectedReleaseDate: new FormControl('', [Validators.required]),
  });

  constructor() { }

  ngOnInit(): void {
  }

}
