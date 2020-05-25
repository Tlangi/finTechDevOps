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
  dateCreated: string;
  taskStartDate: string;
  taskEndDate: string;
  expectedReleaseDate: string;
  comments: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: TasksUpdateItem[] = [
  {id: 1, employeeName: 'Hydrogen', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
  status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 2, employeeName: 'Helium', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 3, employeeName: 'Lithium', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 4, employeeName: 'Beryllium', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 5, employeeName: 'Boron', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 6, employeeName: 'Carbon', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 7, employeeName: 'Nitrogen', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 8, employeeName: 'Oxygen', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 9, employeeName: 'Fluorine', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 10, employeeName: 'Neon', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 11, employeeName: 'Sodium', systemOrProject: '', taskName: '', taskDescription: '',
    typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 12, employeeName: 'Magnesium', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 13, employeeName: 'Aluminum', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 14, employeeName: 'Silicon', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 15, employeeName: 'Phosphorus', systemOrProject: '', taskName: '', taskDescription: '',
    typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 16, employeeName: 'Sulfur', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '',
    priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 17, employeeName: 'Chlorine', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 18, employeeName: 'Argon', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 19, employeeName: 'Potassium', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
  {id: 20, employeeName: 'Calcium', systemOrProject: '', taskName: '', taskDescription: '', typeOfWork: '', priority: '', jira: '', story: '',
    status: '', dateCreated: '', taskStartDate: '', taskEndDate: '', expectedReleaseDate: '', comments: ''},
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
