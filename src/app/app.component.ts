import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsersDataService } from './services/users-data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  users: any;
  filteredUsers: any; 
  http: HttpClient;
  constructor(private userData: UsersDataService, private httpClient: HttpClient) {
    this.http = httpClient;
    this.userData.users().subscribe((data) => {
      this.users = data;
    });
  }
  getUserFormData(data: any) {
    if (this.users && this.users.length > 0) {
      if (data.Year === 'ALL' && !data.Search) {
        this.filteredUsers = this.users;
      } else if (data.Year !== 'ALL' && !data.Search) {
        this.filteredUsers = this.users.filter((user: any) => user.Year === data.Year);
      } else if (data.Search && !data.Year) {
        this.filteredUsers = this.users.filter((user: any) => user.Authors.toLowerCase().includes(data.Search.toLowerCase()));
      } else if (data.Year !== 'ALL' && data.Search) {
        this.filteredUsers = this.users.filter((user: any) => user.Year === data.Year && user.Authors.toLowerCase().includes(data.Search.toLowerCase()));
      } else if (data.Year === 'ALL' && data.Search) {
        this.filteredUsers = this.users.filter((user: any) => user.Authors.toLowerCase().includes(data.Search.toLowerCase()));
      }
    }
  }
}
