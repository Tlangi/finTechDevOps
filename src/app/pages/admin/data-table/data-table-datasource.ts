import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface DataTableItem {
  name: string;
  team: string;
  status: string;
  id: number;
}

// TODO: replace this with real data from your application
const EXAMPLE_DATA: DataTableItem[] = [
  {id: 1, name: 'Tlangelani Maswanganye', team: 'Global Market', status: 'Active'},
  {id: 2, name: 'Ayanda Ngobo', team: 'Fintech Java Developers', status: 'Leave'},
  {id: 3, name: 'Steve Jonson', team: 'Oracle', status: 'Active'},
  {id: 4, name: 'Andrew Smith', team: 'Business Technology', status: 'Inactive'},
  {id: 5, name: 'Hector Mavunda', team: 'Fintech Java Developers', status: 'Active'},
  {id: 6, name: 'John Stain', team: 'Application Support', status: 'Active'},
  {id: 7, name: 'Van De Sar', team: 'Business Analysis', status: 'Active'},
  {id: 8, name: 'Victor Gomez', team: 'Procurement', status: 'Leave'},
  {id: 9, name: 'Ismael Makitla', team: 'Corporate Accounting', status: 'Inactive'},
  {id: 10, name: 'Thakhani Tharange', team: 'Technical Accounting', status: 'Active'},
  {id: 11, name: 'Phashe Makgotso', team: 'Business Support', status: 'Leave'},
  {id: 12, name: 'Linda Ngcaba', team: 'Application Support', status: 'Active'},
  {id: 13, name: 'Snenhlahla Khumalo', team: 'Technical Accounting', status: 'Active'},
  {id: 14, name: 'Zinhle Dube', team: 'Oracle', status: 'Suspension'},
  {id: 15, name: 'Faith Mdaka', team: 'FinTech Tester', status: 'Active'},
  {id: 16, name: 'Shingisani Mashava', team: 'Murex', status: 'Active'},
  {id: 17, name: 'Tinyiko Muvi', team: 'Corporate Accounting', status: 'Active'},
  {id: 18, name: 'Lindiwe Mazibuko', team: 'Application Support', status: 'Active'},
  {id: 19, name: 'Gift Khoza', team: 'Procurement', status: 'Active'},
  {id: 20, name: 'Daisy Walker', team: 'Human Resource', status: 'Active'}
];

/**
 * Data source for the DataTable view. This class should
 * encapsulate all logic for fetching and manipulating the displayed data
 * (including sorting, pagination, and filtering).
 */
export class DataTableDataSource extends DataSource<DataTableItem> {
  data: DataTableItem[] = EXAMPLE_DATA;
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
  connect(): Observable<DataTableItem[]> {
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
  private getPagedData(data: DataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: DataTableItem[]) {
    if (!this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort.direction === 'asc';
      switch (this.sort.active) {
        case 'name': return compare(a.name, b.name, isAsc);
        case 'team': return compare(a.team, b.team, isAsc);
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
