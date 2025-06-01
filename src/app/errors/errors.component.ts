import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';

@Component({
  selector: 'app-errors',
  standalone: true,
  imports: [],
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.css',
})
export class ErrorsComponent {
  private http = inject(HttpClient);
  baseUrl = ' http://localhost:5091/api/';
  validationErrors: string[] = [];
  getValidationError() {
    this.http.post(this.baseUrl + 'account/register', {}).subscribe({
      next: (response) => console.log(response),
      error: (error) => {
        this.validationErrors = error;
      },
    });
  }
}
