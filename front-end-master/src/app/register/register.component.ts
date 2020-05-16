import { Component, OnInit } from '@angular/core';
import {UserService} from '../services/user.service';
import {User} from '../models/user';
import {Role} from '../models/role';
import {NgSelectModule, NgOption} from '@ng-select/ng-select';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  roles = [
    {id: Role.STUDENT, name: 'Student'},
    {id: Role.TEACHER, name: 'Instructor'}
  ];
  user: User = new User();
  errorMessage: string;

  constructor(private userService: UserService, private router: Router) { }

  ngOnInit() {
    if(this.userService.currentUserValue){
      this.router.navigate(['/home']);
      return;
    }
  }

  register(){
    this.userService.register(this.user).subscribe(data => {
      this.router.navigate(['/login']);
    },err => {
      this.errorMessage = "Username is already exist";
    });
  }

}
