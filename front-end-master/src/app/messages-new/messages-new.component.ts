import { Component, OnInit } from '@angular/core';
import {Conversation} from '../models/conversation';
import {Messages} from '../models/messages';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../models/user';

@Component({
  selector: 'app-messages-new',
  templateUrl: './messages-new.component.html',
  styleUrls: ['./messages-new.component.scss']
})
export class MessagesNewComponent implements OnInit {

  conversation: Conversation = new Conversation();
  message: Messages = new Messages();
  recip: any;
  recipName: string;
  private currentStudent: User;


  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
    this.currentStudent = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
  }

  getRecipInfo() {
      this.userService.getRecipInfo(this.recipName).subscribe(data => {
        this.recip = data;
        this.conversation.user = this.currentStudent;
        this.conversation.recep = this.recip;
        this.conversation.timestamp = Date.now();
        this.userService.createConversation(this.conversation).subscribe(conversation => {
          this.router.navigate(['home/messages-convo/' + conversation['id']]);
        }, err => {
          // @ts-ignore
          this.errorMessage = 'Something wrong has happened';
        });
      });
  }

  createConversation() {
        this.getRecipInfo();
  }
}
