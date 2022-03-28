import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import {
  BudegaUser,
  ClientUser,
  NewBudegaEmployee,
  Role,
  UpdateBudegaUser
} from '../../admin/user/models/models';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  api = environment.api;
  resource = 'users';

  constructor(private httpClient: HttpClient) {}

  getUserList(): Observable<BudegaUser[]> {
    return this.httpClient.get<BudegaUser[]>(
      `${this.api.url}/${this.resource}`,
      {
        reportProgress: true
      }
    );
  }

  addUserClient(client: ClientUser): Observable<void> {
    return this.httpClient.post<void>(
      `${this.api.url}/${this.resource}/client`,
      client,
      {
        reportProgress: true
      }
    );
  }

  addEmployee(employee: NewBudegaEmployee): Observable<void> {
    return this.httpClient.post<void>(
      `${this.api.url}/${this.resource}/employee`,
      employee,
      {
        reportProgress: true
      }
    );
  }

  getRoles(): Observable<Role[]> {
    return this.httpClient.get<Role[]>(
      `${this.api.url}/${this.resource}/roles`,
      {
        reportProgress: true
      }
    );
  }

  getUserById(id: string): Observable<BudegaUser[]> {
    return this.httpClient.get<BudegaUser[]>(
      `${this.api.url}/${this.resource}/${id}`,
      {
        reportProgress: true
      }
    );
  }

  updateBudegaUserImage(
    budegaUser: BudegaUser,
    image: FormData
  ): Observable<void> {
    return this.httpClient.post<void>(
      `${this.api.url}/${this.resource}/image/${budegaUser.id}`,
      image,
      {
        reportProgress: true
      }
    );
  }

  updateBudegaUser(updateBudegaUser: UpdateBudegaUser): Observable<void> {
    return this.httpClient.put<void>(
      `${this.api.url}/${this.resource}/${updateBudegaUser.budegaUser.id}`,
      updateBudegaUser,
      {
        reportProgress: true
      }
    );
  }

  activeUser(budegaUserId: string, active: boolean): Observable<void> {
    return this.httpClient.post<void>(
      `${this.api.url}/${this.resource}/active/${budegaUserId}`,
      { state: active },
      {
        reportProgress: true
      }
    );
  }
}
