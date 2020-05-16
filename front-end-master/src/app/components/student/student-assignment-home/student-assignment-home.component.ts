import { Component, OnInit } from '@angular/core';
import {Assignment} from '../../../models/assignment';
import {User} from '../../../models/user';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../../services/course.service';
import {AssignmentService} from '../../../services/assignment.service';
import * as fileSaver from 'file-saver';
import swal from "sweetalert2";
import {GradeService} from '../../../services/grade.service';
import {Grade} from '../../../models/grade';

@Component({
  selector: 'app-student-assignment-home',
  templateUrl: './student-assignment-home.component.html',
  styleUrls: ['./student-assignment-home.component.scss']
})
export class StudentAssignmentHomeComponent implements OnInit {
  assignmentId: string;
  currentAssignment: Assignment;
  currentUser: User;
  currentGrade: Grade;
  isGraded: boolean;
  file: File;

  constructor(private route: ActivatedRoute, private courseService: CourseService, private assignmentService: AssignmentService,
              private gradeService: GradeService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('assignmentId')){
        this.assignmentId = params.get('assignmentId');
      }
      if(this.assignmentId || this.currentUser) {
        this.getCurrentAssignment();
      }
    });
  }

  submitAssignment() {
      swal({
        title: 'Are you sure you want to add this content?',
        type: 'question',
        showCancelButton: true,
        confirmButtonText: 'Yes',
        cancelButtonText: 'Cancel'
      }).then(() => {
        this.assignmentService.uploadStudentAssignment(this.file, this.currentAssignment, this.currentUser).subscribe((assignments) => {
          this.file = null;
          swal({
            title: 'Success',
            text: 'Assignment submitted successfully!',
            type: 'success',
            showCancelButton: false,
            confirmButtonText: 'OK'
          }).then(() => {
          })
        });
      }, function (dismiss) {
        if (dismiss === 'cancel') {
        }
      })
  }

  getCurrentAssignment() {
    this.assignmentService.getAssignmentById(this.assignmentId).subscribe(assignment => {
      this.currentAssignment = assignment;
      this.getAssignmentGrade(assignment);
    });
  }

  getAssignmentGrade(assignment) {
    this.gradeService.getStudentGrade(this.assignmentId, this.currentUser.id).subscribe(grade => {
      this.currentGrade = grade;
      if (grade.grade === null) {
        this.isGraded = false;
      } else {
        this.isGraded = true;
      }
    });
  }

  download(assignment) {
    this.assignmentService.downloadAssignment(assignment.file)
        .subscribe(response => {
          const fileName = assignment.file.substring(assignment.file.lastIndexOf("/") + 1);
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          fileSaver.saveAs(fileURL, fileName);
        });
  }

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
    }
  }

}
