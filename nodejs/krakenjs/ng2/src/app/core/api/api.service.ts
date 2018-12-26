import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { CoreModule } from '../core.module';

export type ApiParams = HttpParams | { [param: string]: string | string[]; };

@Injectable({
  providedIn: CoreModule
})
export class ApiService {

  constructor(private http: HttpClient) {

  }

  get<T>(url: string, params?: ApiParams | null): Observable<T> {
    return this.http.get<T>(url, { params: params });
  }

  post<T>(url: string, params?: ApiParams | null): Observable<T> {
    return this.http.post<T>(url, { params: params });
  }

  put<T>(url: string, params?: ApiParams | null): Observable<T> {
    return this.http.put<T>(url, { params: params });
  }

  delete<T>(url: string, params?: ApiParams | null): Observable<T> {
    return this.http.delete<T>(url, { params: params });
  }
}
