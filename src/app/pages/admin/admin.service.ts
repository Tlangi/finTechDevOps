import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = '../assets/data/';

  constructor(private httpClient: HttpClient
  ) { }


  public getEmployees(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'employees.json');
  }

  public getTeams(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'teams.json');
  }

  public getStatus(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'status.json');
  }

  public getApplications(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'applications.json');
  }

  public getWorkType(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'workType.json');
  }

  public getStatusTab(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'statusTab.json');
  }
}
