import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;
  errorMessage: string;

  constructor(private route: ActivatedRoute, private userService: UserService, private router: Router ) { 
    this.user = JSON.parse(localStorage.getItem("currentUser"));

  }

  ngOnInit() {
  }

  updateUserProfile () {
    this.userService.updateProfile(this.user).subscribe((user) => {
      console.log(user);
      this.user = user;
      localStorage.setItem("currentUser", JSON.stringify(user));
      swal({
        title: 'Success',
        text: 'Profile updated successfully!!',
        type: 'success',
        showCancelButton: false,
        confirmButtonText: 'OK'
      }).then(() => {
      })
    },err => {
      this.errorMessage = "Failed to update";
    });
  }
  //profileUpdate(){

   // this.userService.profileUpdate(this.user);
   // console.log("form submissiogtt")

    
  //}


}
