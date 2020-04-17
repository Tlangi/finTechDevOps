import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FetchDataService {

  baseUrl = 'src/assets/data/';

  constructor(private httpClient: HttpClient) { }

  public getEmployees(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'employees');
  }

  public getStatus(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'status');
  }

  public getTeams(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'teams');
  }

}
