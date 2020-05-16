import { Component, OnInit } from '@angular/core';
import {Module} from '../../../models/modules';
import {User} from '../../../models/user';
import {FileDetails} from '../../../models/filedetails';
import {Assignment} from '../../../models/assignment';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../../services/course.service';
import {AssignmentService} from '../../../services/assignment.service';
import swal from "sweetalert2";
import * as fileSaver from 'file-saver';
import {TeacherService} from '../../../services/teacher.service';
import {AssignGradeComponent} from '../assign-grade/assign-grade.component';
import {MatDialog} from '@angular/material/dialog';
import {GradeService} from '../../../services/grade.service';
import {Grade} from '../../../models/grade';

@Component({
  selector: 'app-instructor-assignment-home',
  templateUrl: './instructor-assignment-home.component.html',
  styleUrls: ['./instructor-assignment-home.component.scss']
})
export class InstructorAssignmentHomeComponent implements OnInit {
  assignmentId: string;
  currentAssignment: Assignment;
  currentUser: User;
  studentList: Array<User>;
  submissions: Array<FileDetails>;
  file: File;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private courseService: CourseService,
              private teacherService: TeacherService, private assignmentService: AssignmentService,
              private gradeServcie: GradeService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('assignmentId')){
        this.assignmentId = params.get('assignmentId');
      }
      if(this.assignmentId || this.currentUser) {
        this.getCurrentAssignment();
        this.getEnrolledStudent();
      }
    });
  }

  getCurrentAssignment() {
    this.assignmentService.getAssignmentById(this.assignmentId).subscribe(assignment => {
      this.currentAssignment = assignment;
    });
  }

  getEnrolledStudent() {
    this.teacherService.findAllStudentsOfInstructor(this.currentUser.id).subscribe(students => {
      this.studentList = students;
      this.getAllStudentSubmission(students)
    });
  }

  private getAllStudentSubmission (students) {
    this.submissions = [];
    let tempSubmission = this.submissions;
    const temp = this;
    students.forEach(function (value) {
      temp.assignmentService.getAllSubmissions(temp.assignmentId, value.id).subscribe(fileDetails => {
        if (fileDetails[0])
          tempSubmission.push(fileDetails[0]);
      });
    });
  }

  download(submission) {
    this.assignmentService.downloadAssignment(submission.file)
        .subscribe(response => {
          const fileName = submission.file.substring(submission.file.lastIndexOf("/") + 1);
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
          fileSaver.saveAs(fileURL, fileName);
        });
  }

  editAssignment() {

  }
  uploadAssignmentFile() {
    swal({
      title: 'Are you sure you want to add this content?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then(() => {
      this.assignmentService.addAssignmentFile(this.file, this.currentAssignment).subscribe((assignments) => {
        this.file = null;
        swal({
          title: 'Success',
          text: 'Assignment uploaded successfully!',
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

  fileChange(event) {
    const fileList: FileList = event.target.files;
    if (fileList.length > 0) {
      this.file = fileList[0];
    }
  }

  openDialog(submission): void {
    this.gradeServcie.getStudentGrade(submission.assignment.id, submission.uploadedBy.id).subscribe(resultGrade => {
      let grade = resultGrade;
      if (grade === null) {
        grade = new Grade();
        grade.assignment = submission.assignment;
        grade.user = submission.uploadedBy;
      }
      const dialogRef = this.dialog.open(AssignGradeComponent, {
        width: '250px',
        data: {currentGrade: grade.grade}
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result !== undefined) {
          grade.grade = result;
          this.gradeServcie.submitAssignment(grade).subscribe(result => {
            console.log(result);
          })
        }
      });
    });
  }
}
