import { TestBed, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
// import { CdkDragDrop } from '@angular/cdk/drag-drop';
// import { CdkDrag, CdkDropList } from '@angular/cdk/drag-drop';
// import { waitForAsync } from '@angular/core/testing';
import { EmployeesService } from './service/employees.service';
import { Employee } from './models/employee.model';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
  let employeesService: EmployeesService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        FormsModule
      ],
      declarations: [AppComponent],
      providers: [EmployeesService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    employeesService = TestBed.inject(EmployeesService);
    fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    const compiled = fixture.nativeElement as HTMLElement;
    const titleElement = compiled.querySelector('.navbar-brand');
    expect(titleElement?.textContent).toContain('Awesome employee management system!');
  });

  it('should call getAllEmployees on initialization', () => {
    spyOn(component, 'getAllEmployees');
  
    component.ngOnInit();
  
    expect(component.getAllEmployees).toHaveBeenCalled();
  });

  it('should add an employee on form submission', () => {
    const mockEmployee: Employee = {
      id: '1',
      name: 'John Doe',
      phone: '1234567890',
      orderIndex: 1
    };
    component.employee = mockEmployee;
  
    spyOn(employeesService, 'addEmployee').and.returnValue(of({}));
    spyOn(component, 'getAllEmployees');
  
    component.onSubmit();
  
    expect(employeesService.addEmployee).toHaveBeenCalledWith(mockEmployee);
    expect(component.getAllEmployees).toHaveBeenCalled();
    expect(component.employee).toEqual({ id: '', name: '', phone: '', orderIndex: 0 });
  });

  it('should delete an employee', () => {
    const mockEmployeeId = '1';
  
    spyOn(employeesService, 'deleteEmployee').and.returnValue(of({}));
    spyOn(component, 'getAllEmployees');
  
    component.deleteEmployee(mockEmployeeId);
  
    expect(employeesService.deleteEmployee).toHaveBeenCalledWith(mockEmployeeId);
    expect(component.getAllEmployees).toHaveBeenCalled();
  });

  it('should edit an employee', () => {
    const mockEmployeeId = '1';
    const mockEmployee: Employee = {
      id: '1',
      name: 'Abc Defg',
      phone: '8777777',
      orderIndex: 1
    };
    component.employees = [mockEmployee];
  
    spyOn(employeesService, 'editEmployee').and.returnValue(of({}));
    spyOn(component, 'getAllEmployees');
  
    component.editEmployee(mockEmployeeId);
  
    expect(employeesService.editEmployee).toHaveBeenCalledWith(mockEmployeeId, mockEmployee);
    expect(component.getAllEmployees).toHaveBeenCalled();
  });

  it('should set isEditing to true for an employee', () => {
    const mockEmployee: Employee = {
      id: '1',
      name: 'Abc Defg',
      phone: '8777777',
      orderIndex: 1
    };
  
    component.startEditingEmployee(mockEmployee);
  
    expect(mockEmployee.isEditing).toBe(true);
  });

  it('should save an employee', () => {
    const mockEmployee: Employee = {
      id: '1',
      name: 'Abc Defg',
      phone: '8777777',
      orderIndex: 1,
      isEditing: true
    };
  
    spyOn(employeesService, 'editEmployee').and.returnValue(of({}));
    spyOn(component, 'getAllEmployees');
  
    component.saveEmployee(mockEmployee);
  
    expect(employeesService.editEmployee).toHaveBeenCalledWith(mockEmployee.id, mockEmployee);
    expect(mockEmployee.isEditing).toBe(false);
    expect(component.getAllEmployees).toHaveBeenCalled();
  });

});

