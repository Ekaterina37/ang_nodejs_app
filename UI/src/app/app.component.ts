import { Component, OnInit } from '@angular/core';
import { EmployeesService } from './service/employees.service';
import { Employee } from './models/employee.model';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'UI';
  employees: Employee[] = [];
  employee: Employee = {
    id: '',
    name: '',
    phone: '',
    orderIndex: 0
  };

  constructor(private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.getAllEmployees();
  }

  getAllEmployees() {
    this.employeesService.getAllEmployees().subscribe({
      next: (response) => {
        this.employees = response.sort((a, b) => a.orderIndex - b.orderIndex);
        this.employees.forEach((employee) => {
          employee.isEditing = false;
        });
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  onSubmit() {
    this.employeesService.addEmployee(this.employee).subscribe(() => {
      this.getAllEmployees();
      this.employee = {
        id: '',
        name: '',
        phone: '',
        orderIndex: 0
      };
    });
  }

  deleteEmployee(id: string) {
    this.employeesService.deleteEmployee(id).subscribe(() => {
      this.getAllEmployees();
    });
  }

  editEmployee(id: string) {
    const employee = this.employees.find((emp) => emp.id === id);
    if (employee) {
      this.employeesService.editEmployee(id, employee).subscribe(() => {
        this.getAllEmployees();
      });
    }
  }

  startEditingEmployee(employee: Employee) {
    employee.isEditing = true;
  }

  saveEmployee(employee: Employee) {
    this.employeesService.editEmployee(employee.id, employee).subscribe(() => {
      employee.isEditing = false;
      this.getAllEmployees();
    });
  }

  drop(event: CdkDragDrop<Employee[]>) {
    moveItemInArray(this.employees, event.previousIndex, event.currentIndex);
    this.updateOrderIndex();
  }

  updateOrderIndex() {
    this.employees = this.employees.map((employee, index) => {
      return { ...employee, orderIndex: index + 1 };
    });
  
    this.employeesService.updateEmployeesOrder(this.employees).subscribe({
      next: () => {
        console.log('Order updated');
      },
      error: (error) => {
        console.error('Cannot update order', error);
      }
    });
  }
}
