import { Component, OnInit } from '@angular/core';
import {Conversation} from '../models/conversation';
import {ActivatedRoute, Router} from '@angular/router';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {Messages} from '../models/messages';
import {Observable} from 'rxjs';
import { interval } from 'rxjs/observable/interval';

@Component({
  selector: 'app-messages-convo',
  templateUrl: './messages-convo.component.html',
  styleUrls: ['./messages-convo.component.scss']
})
export class MessagesConvoComponent implements OnInit {

  private conversation: any;
  private messageList: any;
  private currentStudent: User;
  private convoID: any;
  private message: Messages = new Messages();
  private time: number;
  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router) {
    this.currentStudent = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if (params.has('id')) {
        this.convoID = params.get('id');
      }
      this.getConversationMeta();
      this.getAllMessages();

      interval(1000).subscribe(() => this.getAllMessages());


    });
  }

  private getConversationMeta() {
    this.userService.getConvoMeta(this.convoID).subscribe(data => {
      this.conversation = data;
    });
  }

  private getAllMessages() {
    this.time = Date.now();
    this.userService.getMessages(this.convoID).subscribe(data => {
      this.messageList = data;
      this.messageList.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1);
      this.messageList.reverse();
    });
  }

   private sendMessage() {
        this.message.timestamp = Date.now();
        this.message.user = this.currentStudent;
        this.message.recep = this.conversation.recep;
        this.message.cid = this.conversation.id;
     this.userService.sendMessage(this.message).subscribe(data => {
       // this.router.navigate(['']);
     }, err => {
       // @ts-ignore
       this.errorMessage = 'Something wrong has happened';
     });
     this.getAllMessages();
    }
}
