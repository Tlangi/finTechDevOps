import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';

export interface TeamsDataTable {
  name: string;
  id: number;
}

const teamsData: TeamsDataTable[] = [
  {id: 1, name: 'Barcelona'},
  {id: 2, name: 'Madrid'},
  {id: 3, name: 'Milan'},
  {id: 4, name: 'Amazulu'},
  {id: 5, name: 'Black Lion'},
  {id: 6, name: 'Jomo'},
  {id: 7, name: 'City'},
  {id: 8, name: 'Blue'},
  {id: 9, name: 'Soccer'},
  {id: 10, name: 'Technology'},
  {id: 11, name: 'Done'},
  {id: 12, name: 'Finished'},
];

export class TeamsDataTableDatasource extends DataSource<TeamsDataTable> {
  data: TeamsDataTable[] = teamsData;
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
  connect(): Observable<TeamsDataTable[]> {
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
  private getPagedData(data: TeamsDataTable[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }
  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: TeamsDataTable[]) {
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

