import { AccountService } from './../_services/account.service';
import { Component, inject, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  private accountService = inject(AccountService);
  private toastr = inject(ToastrService);
  cancelRegister = output<boolean>();
  model: any = {};
  validationErrors: string[] = [];

  register() {
    this.accountService.register(this.model).subscribe({
      next: (response) => {
        this.toastr.success('Registration successful');
        this.cancel();
      },
      error: (error) => {
      this.validationErrors = error
      }
    });
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}
