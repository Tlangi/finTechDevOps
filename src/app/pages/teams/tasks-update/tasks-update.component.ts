import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTable } from '@angular/material/table';
import { TasksUpdateDataSource, TasksUpdateItem } from './tasks-update-datasource';

@Component({
  selector: 'app-tasks-update',
  templateUrl: './tasks-update.component.html',
  styleUrls: ['./tasks-update.component.css']
})
export class TasksUpdateComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<TasksUpdateItem>;
  dataSource: TasksUpdateDataSource;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['id', 'employeeName', 'systemOrProject', 'taskName', 'taskDescription',
    'typeOfWork', 'priority', 'jira', 'story', 'status', 'dateCreated', 'taskStartDate',
    'taskEndDate', 'expectedReleaseDate', 'comments'
  ];

  ngOnInit() {
    this.dataSource = new TasksUpdateDataSource();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
    this.table.dataSource = this.dataSource;
  }
}
