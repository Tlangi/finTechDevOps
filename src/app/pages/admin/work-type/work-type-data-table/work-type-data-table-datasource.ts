import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface WorkTypeDataTableItem {
  name: string;
  description: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: WorkTypeDataTableItem[] = [
  {id: 1, name: 'Enhancement', description: 'Enhancement in FMS'},
  {id: 2, name: 'Project (Top 5)', description: 'FMS, MILES, PHS, FDP and KYC'},
  {id: 3, name: 'General Admin Work', description: 'Completing your time sheet and spreadsheet'},
  {id: 4, name: 'Analysis', description: 'Looking at cubes or logs and make some sense of it'},
  {id: 5, name: 'Unit Testing', description: 'Checking if it work perfectly'},
  {id: 6, name: 'Configurations', description: 'Changing settings to make sure that it is working accordingly'},
  {id: 7, name: 'System Administration', description: 'Adding new users and removing others'},
  {id: 8, name: 'Production Issue Investigation', description: 'Checking production issues'},
  {id: 9, name: 'Dev/UAT Issue Investigation', description: 'Investigating dev and uat issues'},
  {id: 10, name: 'Training', description: 'Your leanings and school stuff'}
];

/**
 * Data source for the WorkTypeDataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class WorkTypeDataTableDataSource extends DataSource<WorkTypeDataTableItem> {
  data: WorkTypeDataTableItem[] = EXAMPLE_DATA;
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
  connect(): Observable<WorkTypeDataTableItem[]> {
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
  private getPagedData(data: WorkTypeDataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: WorkTypeDataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
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
