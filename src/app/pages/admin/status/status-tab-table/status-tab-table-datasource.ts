import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface StatusTabTableItem {
  status: string;
  statusType: SubStatusTableItem[];
  id: number;
}

export interface SubStatusTableItem {
  subStatus: string;
  description: string;
  subId: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: StatusTabTableItem[] = [
  {id: 1, status: 'State of Emergency', statusType: [
    {subId: 1, subStatus: 'Low', description: 'Not Too urgent'},
      {subId: 2, subStatus: 'Medium', description: 'Neutral'},
      {subId: 3, subStatus: 'High', description: 'Very urgent'},
      {subId: 4, subStatus: 'Eminent', description: 'It takes first priority'},
    ]},
  {id: 2, status: 'Approval State', statusType: [
      {subId: 1, subStatus: 'Sent For Approval', description: 'Pending Approval'},
      {subId: 2, subStatus: 'Approved', description: 'Congratulations it is Approved'},
      {subId: 3, subStatus: 'Declined', description: 'Not Approved'},
      {subId: 4, subStatus: 'Eminent', description: 'It takes first priority'},
    ]},
  {id: 3, status: 'Project State', statusType: [
      {subId: 1, subStatus: 'Analysis/Investigation', description: 'Being investigated and analyzed'},
      {subId: 2, subStatus: 'Queued For Development', description: 'Not yet being developed'},
      {subId: 3, subStatus: 'Development In Progress', description: 'Development has started'},
      {subId: 4, subStatus: 'Queued For Testing', description: 'Inline to be tested'},
      {subId: 5, subStatus: 'Testing In Progress', description: 'Being tested now'},
      {subId: 6, subStatus: 'On Hold', description: 'Placed on Hold'},
      {subId: 7, subStatus: 'Implemented', description: 'Complete'},
      {subId: 8, subStatus: 'Ready For Deployment', description: 'Almost done, only left with being deployed'},
      {subId: 9, subStatus: 'Parked', description: 'Placed a side. Will be picked up later'},
    ]}
];

/**
 * Data source for the StatusTabTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class StatusTabTableDataSource extends DataSource<StatusTabTableItem> {
  data: StatusTabTableItem[] = EXAMPLE_DATA;
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
  connect(): Observable<StatusTabTableItem[]> {
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
  private getPagedData(data: StatusTabTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: StatusTabTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'status': return compare(a.status, b.status, isAsc);
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
