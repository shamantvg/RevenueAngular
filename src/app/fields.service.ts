import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JsonPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class FieldsService {

  constructor(private http: HttpClient) { }

  //user auth
  EmployeeAuth(empDetails): Observable<any> {
    return this.http.post<any>('http://localhost:8080/employeeAuth',empDetails);
  }


  loggedIn(){
    return !!localStorage.getItem('token');
  }

  getToken(){
    return localStorage.getItem('token');
  }

  //check session token
  CheckSessionToken(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/CheckSessionToken');
  }

  //check session token
  getRevenueData(): Observable<any> {
    return this.http.get<any>('http://localhost:8080/getRevenueData');
  }
}
