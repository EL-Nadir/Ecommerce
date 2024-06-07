// user.service.ts
import { Injectable } from '@angular/core';
import { User } from '../model/user';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private apiUrl = 'http://localhost:3000/users';
  private currentUser: User;

  constructor(private http: HttpClient) {
    // Initialize with complete user data
    this.currentUser = new User(
      '123', // id
      'Nadir', // fullName
      'nadir@example.com', // email
      'password123', // password
    );
  }

  getCurrentUser(): User {
    return this.currentUser;
  }

  setCurrentUser(user: User) {
    this.currentUser = user;
  }

  getUsers(): Observable<any> {
    return this.http.get(this.apiUrl);
  }
}
