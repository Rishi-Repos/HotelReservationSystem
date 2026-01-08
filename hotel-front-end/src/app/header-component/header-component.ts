import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { HttpService } from '../services/http-service';

@Component({
  selector: 'app-header-component',
  imports: [RouterLink],
  templateUrl: './header-component.html',
  styleUrl: './header-component.css',
})
export class HeaderComponent {
  constructor(private httpService: HttpService) {
    this.getLoginDetails();
  }

  login() {
    window.location.href = 'http://localhost:8080/oauth2/authorization/google';
  }

  checkLogin() {
    this.httpService.loginEmployee('matthew.wright.ttb@google.com').subscribe((data) => {
      console.log(data);
    });
  }

  getLoginDetails() {
    this.httpService.getCredentials().subscribe((data) => {
      console.log(data);
    });
  }
}
