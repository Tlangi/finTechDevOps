import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTable} from '@angular/material/table';
import {TasksUpdateDataSource, TasksUpdateItem} from '../tasks-update/tasks-update-datasource';
import {AuthenticationService} from '../../../authentication/services/authentication.service';

@Component({
  selector: 'app-allocated-tasks',
  templateUrl: './allocated-tasks.component.html',
  styleUrls: ['./allocated-tasks.component.css']
})
export class AllocatedTasksComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<TasksUpdateItem>;
  dataSource: TasksUpdateDataSource;
  fullName: string;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'employeeName', 'systemOrProject', 'taskName', 'taskDescription',
    'typeOfWork', 'priority', 'story', 'status', 'expectedReleaseDate', 'progress', 'action'
  ];

  constructor(private authenticationService: AuthenticationService) {
    this.authenticationService.currentUser.subscribe(user => {
      this.fullName = user.firstName + ' ' + user.lastName;
    });
  }

  ngOnInit() {
    this.dataSource = new TasksUpdateDataSource();
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

}
