import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {environment} from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient) { }

  getAll() {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/login`);
  }

  updateProfile(user: User) {
    return this.httpClient.put(`${environment.baseUrl}/${user.id}`, user);
  }

  register(user: User) {
    return this.httpClient.post(`${environment.baseUrl}/register`, user);
  }
}
