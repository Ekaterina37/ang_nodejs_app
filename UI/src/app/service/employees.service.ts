import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {
  private myUrl = 'http://localhost:3000/api/employees';

  constructor(private http: HttpClient) {}

  //GET
  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<Employee[]>(this.myUrl);
  }
  
  //POST
  addEmployee(employee: Employee): Observable<any> {
    return this.http.post(`${this.myUrl}`, employee);
  }
  
  //DELETE
  deleteEmployee(id: string): Observable<any> {
    return this.http.delete(`${this.myUrl}/${id}`);
  }
  
  //PUT
  editEmployee(id: string, employee: Employee): Observable<any> {
    return this.http.put(`${this.myUrl}/${id}`, employee);
  }
  
  //special POST for updatig order to persist the cards after drag and drop
  updateEmployeesOrder(updatedEmployees: Employee[]): Observable<any> {
    return this.http.post(`${this.myUrl}/updateOrder`, updatedEmployees);
  }
}