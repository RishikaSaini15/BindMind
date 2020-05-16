import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(this.userService.currentUserValue){
      this.router.navigate(['/home/dashboard']);
      return;
    }
  }

}
