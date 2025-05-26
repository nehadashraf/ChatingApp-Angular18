import { HttpClient } from '@angular/common/http';
import { Component, inject, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RegisterComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent  implements OnInit{
  http = inject(HttpClient);
  registerMode = false;
  users: any;
  ngOnInit(): void {
    this.getUsers();
  }
  cancelRegisterMode(event: boolean) {
    this.registerMode=event;
  }

  getUsers() {
    this.http.get('http://localhost:5091/api/Users').subscribe({
      next: (response) => {this.users = response; console.log(this.users);},
      error: (error) => console.log(error),
      complete: () => {
        console.log('Request has completed');
      },
    });
  }
  registerToggle() {
    this.registerMode = !this.registerMode;
  }
}
