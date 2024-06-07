import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import {User} from'src/app/interfaces/auth';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  actions : Array<any> = [
    {title: "Home", "route": "/home"},
    {title : "Catalog", "route" : "/products"},
    {title: "Cart", "route": "/cart"},
    {title: "Contact", "route": "/contact"},
    
  ];

  currentUser: User | null = null; // Add currentUser property
  currentAction : any;
  name: string = '';
  email: string = '';
  address: string = '';
  message: string = '';

  setCurrentAction(action: any) {
    this.currentAction = action;
  }

  constructor(
    private router: Router, 
    private authService: AuthService,
    private msgService: MessageService, 
    private http: HttpClient
  ) { }

  logOut() {
    sessionStorage.clear();
    this.router.navigate(['login']);
  }

  ngOnInit(): void {
    const email = sessionStorage.getItem('email');
    if (email) {
      this.authService.getUserByEmail(email).subscribe(
        response => {
          if (response.length > 0) {
            const { id, fullName, email, address, password } = response[0];
            this.currentUser = { id, fullName, email, address, password };
          }
          
        },
        error => {
          this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Something went wrong' });
        }
      );
    }
  }

  sendContact() {
    const contactMessage = {
      name: this.name,
      email: this.email,
      message: this.message
    };
    this.http.post('http://localhost:3000/Contact', contactMessage).subscribe(
      response => {
        this.msgService.add({ severity: 'success', summary: 'Success', detail: 'Message sent successfully' });
        this.name = '';
        this.email = '';
        this.message = '';
      },
      error => {
        this.msgService.add({ severity: 'error', summary: 'Error', detail: 'Failed to send message' });
      }
    );
  }
}
