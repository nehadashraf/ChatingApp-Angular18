import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-errors',
  standalone: true,
  imports: [],
  templateUrl: './errors.component.html',
  styleUrl: './errors.component.css',
})
export class ErrorsComponent {
  private http = inject(HttpClient);
  baseUrl = environment.apiUrl;
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
