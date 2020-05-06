import {DataSource} from '@angular/cdk/collections';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {merge, Observable, of as observableOf} from 'rxjs';
import {map} from 'rxjs/operators';

export interface EmployeesStatusDataTableItem {
  name: string;
  id: number;
}

const employeesData: EmployeesStatusDataTableItem[] = [
  {id: 1, name: 'Active'},
  {id: 2, name: 'Suspended'},
  {id: 3, name: 'Leave'},
  {id: 4, name: 'Inactive'},
  {id: 5, name: 'Temporary'},
];

export class EmployeesStatusDataTableDatasource extends DataSource<EmployeesStatusDataTableItem> {

  data: EmployeesStatusDataTableItem[] = employeesData;
  paginator: MatPaginator;
  sort: MatSort;

  constructor() {
    super();
  }

  connect(): Observable<EmployeesStatusDataTableItem[]> {
    const dataMutations = [
      observableOf(this.data),
      this.paginator.page,
      this.sort.sortChange
    ];

    return merge(...dataMutations).pipe(map( () => {
      return this.getPagedData(this.getSortedData([...this.data]));
    }));
  }

  disconnect() {}

  private getPagedData(data: EmployeesStatusDataTableItem[]) {
    const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
    return data.splice(startIndex, this.paginator.pageSize);
  }

  private getSortedData(data: EmployeesStatusDataTableItem[]) {
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

