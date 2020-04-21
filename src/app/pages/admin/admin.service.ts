import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  baseUrl = '../assets/data/';
  fullNameList: any[] = [];
  teamList: any[] = [];
  statusList: any[] = [];

  constructor(private httpClient: HttpClient) { }


  private getEmployees(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'employees.json');
  }

  private getTeams(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'teams.json');
  }

  private getStatus(): Observable<any> {
    return this.httpClient.get(this.baseUrl + 'status.json');
  }

  fetchData() {

    this.getEmployees().subscribe(data => {
      this.fullNameList = [data];
    });

    this.getTeams().subscribe(data => {
      this.teamList = [data];
    });

    this.getStatus().subscribe(data => {
      this.statusList = [data];
    });
  }

  public filterName(fullName: string) {
    return this.fullNameList.filter(option => new RegExp(fullName).test(option.name));
  }

  public filterTeams(teams: string) {
    return this.teamList.filter(option =>  new RegExp(teams).test(option.name));
  }

  public filterStatus(status: string) {
    return this.statusList.filter(option => new RegExp(status).test(option.name));
  }

}
