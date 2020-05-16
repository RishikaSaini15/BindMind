import { Component, OnInit } from '@angular/core';
import {UserService} from 'app/services/user.service';
import {User} from 'app/models/user';
import {Discussions} from 'app/models/discussions';
import {Router} from '@angular/router';

@Component({
  selector: 'app-discussion-post',
  templateUrl: './discussion-post.component.html',
  styleUrls: ['./discussion-post.component.scss']
})
export class DiscussionPostComponent implements OnInit {

  private errorMessage: string;
  discussion: Discussions = new Discussions();
  currentUser: User;

  constructor(private userService: UserService, private router: Router) {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

  ngOnInit() {
  }

  submitDiscussion(){
    this.discussion.userID = this.currentUser;
    // this.discussion.timestamp = this.time.toLocaleString().slice(0, 10) +' '+ this.time.toLocaleString().slice(11,20)
    this.discussion.timestamp = Date.now();
    this.userService.submitDiscussion(this.discussion).subscribe(data => {
      this.router.navigate(['home/discussion-home']);
    }, err => {
      this.errorMessage = 'Something wrong has happened';
    });
  }

}
