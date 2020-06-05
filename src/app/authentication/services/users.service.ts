import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {User} from '../model/user';
import {environment} from '../../../environments/environment';
import {AuthenticationService} from './authentication.service';
import {UpdateUser} from '../model/update-user';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private httpClient: HttpClient,
              private authenticationService: AuthenticationService
              ) { }

  getAll() {
    return this.httpClient.get<User[]>(`${environment.apiUrl}/login`);
  }

  updateProfile(updateUser: UpdateUser) {
    return this.httpClient.put(`${environment.baseUrl}/${this.authenticationService.currentUserValue.id}`, updateUser);
  }

  register(user: User) {
    return this.httpClient.post(`${environment.baseUrl}/register`, user);
  }
}
