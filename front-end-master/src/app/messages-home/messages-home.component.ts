import { Component, OnInit } from '@angular/core';
import {User} from '../models/user';
import {ActivatedRoute} from '@angular/router';
import {UserService} from 'app/services/user.service';
import {Conversation} from '../models/conversation';

@Component({
  selector: 'app-messages-home',
  templateUrl: './messages-home.component.html',
  styleUrls: ['./messages-home.component.scss']
})
export class MessagesHomeComponent implements OnInit {

  currentStudent: User;
  private studentId: string;
  private conversations: any;
  private conversations2:  any;
  private list: Array<object>
  refreshTime: any;
  private time: number;

  constructor(private route: ActivatedRoute, private userService: UserService) {
    this.currentStudent = JSON.parse(localStorage.getItem("currentUser"));
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.studentId = params.get('id');
      }
      this.time = Date.now();
      this.getAllConversations();
      this.getAllRConversations();
    });
  }

  private getAllConversations() {
    this.userService.findConversationsByUserID(this.currentStudent.id).subscribe(data => {
      this.conversations = data;
    });
  }

  private getAllRConversations() {
    this.userService.findConversations2ByUserID(this.currentStudent.id).subscribe(data => {
      this.conversations2 = data;
      Array.prototype.push.apply(this.conversations, this.conversations2);
      this.conversations.sort((a, b) => (a.timestamp > b.timestamp) ? 1 : -1);
      this.conversations.reverse();
    });
  }
}
