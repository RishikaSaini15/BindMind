import { Component, OnInit } from '@angular/core';
import {Course} from '../../../models/course';
import {User} from '../../../models/user';
import {Module} from '../../../models/modules';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../../services/course.service';

@Component({
  selector: 'app-student-course-home',
  templateUrl: './student-course-home.component.html',
  styleUrls: ['./student-course-home.component.scss']
})
export class StudentCourseHomeComponent implements OnInit {
  currentStudent: User;
  currentCourse: Course;
  courseId: string;
  moduleList: Array<Module>;
  constructor(private route: ActivatedRoute, private courseService: CourseService) {
    this.currentStudent = JSON.parse(localStorage.getItem("currentUser"));
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('courseId')){
        this.courseId = params.get('courseId');
      }
      if(this.courseId || this.currentStudent) {
        this.getCourse();
        this.findAllModules();
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

}
