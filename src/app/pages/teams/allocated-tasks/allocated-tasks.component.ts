import {AfterViewInit, Component, OnChanges, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {TasksUpdateDataSource, TasksUpdateItem} from '../tasks-update/tasks-update-datasource';
import {AuthenticationService} from '../../../authentication/services/authentication.service';
import {FormControl, FormGroup} from '@angular/forms';
import {DatePipe} from '@angular/common';
import {from} from 'rxjs';

@Component({
  selector: 'app-allocated-tasks',
  templateUrl: './allocated-tasks.component.html',
  styleUrls: ['./allocated-tasks.component.css']
})
export class AllocatedTasksComponent implements OnInit, OnChanges, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<TasksUpdateItem>;
  dataSource: TasksUpdateDataSource;
  pipe: DatePipe;

  fullName: string;
  allocatedTasksFilter: FormGroup = new FormGroup({
    inputFilter: new FormControl(''),
    fromDate: new FormControl(),
    toDate: new FormControl(),
  });
  fromDate: Date;
  toDate: Date;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'systemOrProject', 'taskName', 'taskDescription',
    'typeOfWork', 'priority', 'story', 'status', 'expectedReleaseDate', 'progress', 'action'
  ];

  constructor(private authenticationService: AuthenticationService) {
    this.dataSource = new TasksUpdateDataSource();
    this.pipe = new DatePipe('en');
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.authenticationService.currentUser) {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.table.dataSource =  this.table.dataSource = this.dataSource.data.filter( option =>
        new RegExp(this.fullName, 'gi').test(option.employeeName)
      ).slice(0, 5);
    }
  }

  ngOnChanges() {
  }

  private filterDateRange() {
    /* this.allocatedTasksFilter.controls.fromDate.valueChanges.subscribe( (date) => {
      console.log(date);
      this.fromDate = date;
      console.log(this.fromDate);
    });
    this.allocatedTasksFilter.controls.toDate.valueChanges.subscribe( (date) => {
      this.toDate = date;
      console.log(this.toDate);
    });
    this.dataSource.data = this.dataSource.data.filter(
      date => new Date(date.expectedReleaseDate) >= new Date(this.fromDate) &&
        new Date(date.expectedReleaseDate) <= new Date(this.toDate)
    );

    console.log(this.dataSource.data); */
  }

}
