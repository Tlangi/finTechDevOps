import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface TasksUpdateItem {
  employeeName: string;
  systemOrProject: string;
  taskName: string;
  taskDescription: string;
  typeOfWork: string;
  priority: string;
  jira: string;
  story: string;
  status: string;
  dateCreated: Date;
  taskStartDate: Date;
  taskEndDate: Date;
  expectedReleaseDate: Date;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TasksUpdateItem[] = [
  {id: 1, employeeName: 'Tlangelani Maswanganye', systemOrProject: 'FMS', taskName: 'FMS Dev', taskDescription: '',
    typeOfWork: '', priority: '', jira: '', story: '',
  status: '', dateCreated: new Date(2016, 11, 24),
    taskStartDate: new Date(2016, 11, 24), taskEndDate: new Date(2016, 11, 24),
    expectedReleaseDate: new Date(2016, 11, 24)},
  {id: 2, employeeName: 'Thakhani Tharage', systemOrProject: 'Miles', taskName: 'Miles changes', taskDescription: '',
    typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: new Date(2016, 11, 24),
    taskStartDate: new Date(2016, 11, 24), taskEndDate: new Date(2016, 11, 24),
    expectedReleaseDate: new Date(2016, 11, 24)},
  {id: 3, employeeName: 'Larry Holeni', systemOrProject: 'FDP', taskName: '', taskDescription: '',
    typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: new Date(2016, 11, 24),
    taskStartDate: new Date(2016, 11, 24), taskEndDate: new Date(2016, 11, 24),
    expectedReleaseDate: new Date(2016, 11, 24)},
  {id: 4, employeeName: 'Ayanda Ngobeni', systemOrProject: 'FMS', taskName: '', taskDescription: '',
    typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: new Date(2016, 11, 24),
    taskStartDate: new Date(2016, 11, 24), taskEndDate: new Date(2016, 11, 24),
    expectedReleaseDate: new Date(2016, 11, 24)},
  {id: 5, employeeName: 'Tlangelani Maswanganye', systemOrProject: 'Miles', taskName: '', taskDescription: '',
    typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: new Date(2016, 11, 24),
    taskStartDate: new Date(2016, 11, 24), taskEndDate: new Date(2016, 11, 24),
    expectedReleaseDate: new Date(2016, 11, 24)},
  {id: 6, employeeName: 'Larry Holeni', systemOrProject: 'Phs', taskName: '', taskDescription: '',
    typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: new Date(2016, 11, 24),
    taskStartDate: new Date(2016, 11, 24), taskEndDate: new Date(2016, 11, 24),
    expectedReleaseDate: new Date(2016, 11, 24)},
  {id: 7, employeeName: 'Ismael Makitla', systemOrProject: 'Komainu', taskName: '', taskDescription: '',
    typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: new Date(2016, 11, 24),
    taskStartDate: new Date(2016, 11, 24), taskEndDate: new Date(2016, 11, 24),
    expectedReleaseDate: new Date(2016, 11, 24)},
  {id: 8, employeeName: 'Ismael Makitla', systemOrProject: 'Miles', taskName: '', taskDescription: '',
    typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: new Date(2016, 11, 24),
    taskStartDate: new Date(2016, 11, 24), taskEndDate: new Date(2016, 11, 24),
    expectedReleaseDate: new Date(2016, 11, 24)},
  {id: 9, employeeName: 'Ayanda Ngobeni', systemOrProject: 'FMS', taskName: '', taskDescription: '',
    typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: new Date(2016, 11, 24),
    taskStartDate: new Date(2016, 11, 24), taskEndDate: new Date(2016, 11, 24),
    expectedReleaseDate: new Date(2016, 11, 24)},
  {id: 10, employeeName: 'Thakhani Tharage', systemOrProject: 'Miles', taskName: '', taskDescription: '',
    typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: new Date(2016, 11, 24),
    taskStartDate: new Date(2016, 11, 24), taskEndDate: new Date(2016, 11, 24),
    expectedReleaseDate: new Date(2016, 11, 24)},
];

/**
 * Data source for the TasksUpdate view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class TasksUpdateDataSource extends DataSource<TasksUpdateItem> {
  data: TasksUpdateItem[] = EXAMPLE_DATA;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<TasksUpdateItem[]> {
    // Combine everything that affects the rendered data into one update
    // stream for the data-table to consume.
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map(() => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect() {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getPagedData(data: TasksUpdateItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TasksUpdateItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.employeeName, b.employeeName, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
