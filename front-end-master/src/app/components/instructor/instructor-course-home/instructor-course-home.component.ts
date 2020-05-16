import { Component, OnInit } from '@angular/core';
import {User} from '../../../models/user';
import {Course} from '../../../models/course';
import {Module} from '../../../models/modules';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../../services/course.service';
import {TeacherService} from '../../../services/teacher.service';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {ViewStudentComponent } from '../view-student/view-student.component'

@Component({
  selector: 'app-instructor-course-home',
  templateUrl: './instructor-course-home.component.html',
  styleUrls: ['./instructor-course-home.component.scss']
})
export class InstructorCourseHomeComponent implements OnInit {
  currentInstructor: User;
  currentCourse: Course;
  courseId: string;
  moduleList: Array<Module>;
  studentList: Array<User>;
  innerWidth: number;
  constructor(private route: ActivatedRoute, private courseService: CourseService, private teacherService: TeacherService, private dialog: MatDialog) {
    this.currentInstructor = JSON.parse(localStorage.getItem("currentUser"));
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.innerWidth = window.innerWidth;
      if(params.has('courseId')){
        this.courseId = params.get('courseId');
      }
      if(this.courseId || this.currentInstructor) {
        this.getCourse();
        this.findAllModules();
        this.getEnrolledStudent();
      }
    });
  }

  findAllModules(){
    this.courseService.findAllModulesOfCourse(this.courseId).subscribe(data => {
      this.moduleList = data;
    });
  }

  getCourse() {
    this.courseService.getCourseById(this.courseId).subscribe(course => {
      this.currentCourse = course;
    });
  }

  getEnrolledStudent() {
    this.teacherService.findAllStudentsOfInstructor(this.currentInstructor.id).subscribe(students => {
      this.studentList = students;
    });
  }

  viewStudent(viewStudent) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    let relativeWidth = (this.innerWidth * 80) / 100; // take up to 80% of the screen size
    if (this.innerWidth > 1500) {
      relativeWidth = (1500 * 80 ) / 100;
    } else {
      relativeWidth = (this.innerWidth * 80 ) / 100;
    }

    const relativeHeight = (relativeWidth * 7) / 16 + 120; // 16:9 to which we add 120 px for the dialog action buttons ("close")
    dialogConfig.width = relativeWidth + 'px';
    dialogConfig.height = relativeHeight + 'px';

    dialogConfig.data = {
      student: viewStudent
    }

    const dialogRef = this.dialog.open(ViewStudentComponent, dialogConfig);
  }
}
