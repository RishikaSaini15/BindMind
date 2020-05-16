import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';
import {CourseService} from '../../../services/course.service';
import {Course} from '../../../models/course';

@Component({
  selector: 'app-view-course-dialog',
  templateUrl: './view-course-dialog.component.html',
  styleUrls: ['./view-course-dialog.component.scss']
})
export class ViewCourseDialogComponent implements OnInit {
  course: Course;
  //courseId: string;
  transcript: string;
  constructor(
      private dialogRef: MatDialogRef<ViewCourseDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data,
      private courseService: CourseService,
      private _sanitizer: DomSanitizer
  ) {
    this.course = data.course;
    // if(this.courseId) {
    //   this.getCourse();
    // }
  }

  ngOnInit() {
  }

  // getCourse() {
  //   this.courseService.getCourseById(this.courseId).subscribe(course => {
  //     this.course = course;
  //   });
  // }

  close() {
    this.dialogRef.close('Play Youtube Video Closed');
  }
}
