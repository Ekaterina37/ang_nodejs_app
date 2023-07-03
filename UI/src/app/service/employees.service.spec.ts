import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { EmployeesService } from './employees.service';
import { Employee } from '../models/employee.model';

describe('EmployeesService', () => {
  let service: EmployeesService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeesService],
    });
    service = TestBed.inject(EmployeesService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve all employees', () => {
    const mockEmployees: Employee[] = [
    ];

    service.getAllEmployees().subscribe((employees) => {
      expect(employees).toEqual(mockEmployees);
    });

    const req = httpMock.expectOne('http://localhost:3000/api/employees');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployees);
  });


});


