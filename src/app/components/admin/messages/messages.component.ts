import { Component, OnInit } from '@angular/core';
import { MessageService } from 'src/app/services/message.service';
import { MessageService as PrimeNgMessageService } from 'primeng/api';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  messages: any[] = [];

  constructor(
    private messageService: MessageService,
    private msgService: PrimeNgMessageService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.messageService.getMessages().subscribe(
      (data) => {
        this.messages = data;
      },
      (error) => {
        console.error('Error fetching messages', error);
      }
    );
  }

  deleteMessage(messageId: string): void {
    this.messageService.deleteMessage(messageId).subscribe(() => {
      this.msgService.add({ severity: 'success', summary: 'Deleted', detail: 'Message deleted successfully.' });
      this.messages = this.messages.filter(message => message.id !== messageId);
    });
  }
}
