import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {User} from '../models/user';
import {UserService} from '../services/user.service';
import {Course} from '../models/course';
import {CourseStudent} from '../models/coursestudent';
import {Role} from '../models/role';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ViewCourseDialogComponent} from '../components/student/view-course-dialog/view-course-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  userId: string;
  currentUser: User;
  courseList: Array<Course>;
  allCourses: Array<Course>;
  errorMessage: string;
  infoMessage: string;
  isInstructor = false;
  innerWidth: number;

  constructor(private route: ActivatedRoute, private userService: UserService, private dialog: MatDialog) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
    if (this.currentUser && this.currentUser.role === Role.TEACHER) {
      this.isInstructor = true;
    }
  }

  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.route.paramMap.subscribe(params => {
      if(params.has('id')){
        this.userId = params.get('id');
      }

      if(this.userId || this.currentUser) {
        this.findAllCoursesOfUser();
      }
    });
  }

  findAllCoursesOfUser(){
    if(!this.userId){
      this.userId = this.currentUser.id.toString();
    }
    if (this.isInstructor) {
      this.userService.findAllCoursesOfTeacher(this.userId).subscribe(data => {
        this.courseList = data;
      });
    } else {
      this.userService.findAllCoursesOfStudent(this.userId).subscribe(data => {
        this.courseList = data;
        this.findAllCourses(data);
      });
    }
  }

  findAllCourses(enrolledCourse) {
    this.userService.findAllCourses().subscribe(data => {
      this.allCourses = data;
      const courseIds = enrolledCourse.map(course => {
        return course.id
      });
      const temp = this.allCourses.filter(course => !courseIds.includes(course.id));
      this.allCourses = temp;
      console.log(temp);
    });
  }

  enrollStudent(course) {
    if(!this.currentUser){
      this.errorMessage = "You should sign in to enroll a course";
      return;
    }
    const courseStudent = new CourseStudent();
    courseStudent.student = this.currentUser;
    courseStudent.course = course;

    this.userService.enroll(courseStudent).subscribe(data => {
      this.infoMessage = "Enrollment is completed.";
      this.courseList = null;
      this.allCourses = null;
      if(this.userId || this.currentUser) {
        this.findAllCoursesOfUser();
      }
    }, err => {
      this.errorMessage = "Unexpected error occured.";
    });
  }

  unEnrollStudent(course) {
    if(!this.currentUser){
      this.errorMessage = "You should sign in to enroll a course";
      return;
    }
    const courseStudent = new CourseStudent();
    courseStudent.student = this.currentUser;
    courseStudent.course = course;

    this.userService.deEnroll(courseStudent).subscribe(data => {
      this.infoMessage = "De-enrollment is completed.";
      this.courseList = null;
      this.allCourses = null;
      if(this.userId || this.currentUser) {
        this.findAllCoursesOfUser();
      }
    }, err => {
      this.errorMessage = "Unexpected error occured.";
    });
  }

  open(course) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    let relativeWidth = (this.innerWidth * 40) / 100; // take up to 80% of the screen size
    if (this.innerWidth > 1500) {
      relativeWidth = (1500 * 40 ) / 100;
    } else {
      relativeWidth = (this.innerWidth * 40 ) / 100;
    }

    const relativeHeight = (relativeWidth * 5) / 16 + 120; // 16:9 to which we add 120 px for the dialog action buttons ("close")
    dialogConfig.width = relativeWidth + 'px';
    dialogConfig.height = relativeHeight + 'px';

    dialogConfig.data = {
      course: course
    }

    const dialogRef = this.dialog.open(ViewCourseDialogComponent, dialogConfig);
  }
}
