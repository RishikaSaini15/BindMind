import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CourseService} from '../../../services/course.service';
import {MatDialog} from '@angular/material/dialog';
import {User} from '../../../models/user';
import {Assignment} from '../../../models/assignment';
import {AssignmentService} from '../../../services/assignment.service';
import {Module} from '../../../models/modules';
import swal from 'sweetalert2';
import 'sweetalert2/src/sweetalert2.scss'
import {ModuleContent} from '../../../models/modulecontent';

@Component({
  selector: 'app-instructor-course-details',
  templateUrl: './instructor-course-details.component.html',
  styleUrls: ['./instructor-course-details.component.scss']
})
export class InstructorCourseDetailsComponent implements OnInit {

  moduleId: string;
  currentModule: Module;
  currentUser: User;
  assignment: Assignment = new Assignment();
  moduleContent: ModuleContent = new ModuleContent();
  assignments: Array<Assignment>;
  file: File;

  constructor(private route: ActivatedRoute, private courseService: CourseService, private assignmentService: AssignmentService) {
    this.currentUser = JSON.parse(localStorage.getItem("currentUser"));
  }
  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      if(params.has('moduleId')){
        this.moduleId = params.get('moduleId');
      }
      if(this.moduleId || this.currentUser) {
        this.getAllAssignments();
        this.getCurrentModule();
      }
    });
  }

  getCurrentModule() {
    this.courseService.getModuleById(this.moduleId).subscribe(module => {
      this.currentModule = module;
    });
  }

  addNewAssignment() {
    this.assignment.module = this.currentModule;
    swal({
      title: 'Are you sure you want to add this assignment?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then(() => {
      this.assignmentService.submitAssignment(this.assignment).subscribe((assignments) => {
        swal({
          title: 'Success',
          text: 'Assignment Added!',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(() => {
          this.getAllAssignments();
          this.assignment.name = "";
          this.assignment.description = "";
          this.assignment.endDate = null;
          this.assignment.startDate = null;
        })
      });
    }, function (dismiss) {
      if (dismiss === 'cancel') {
      }
    })
  }

  getAllAssignments(){
    this.assignmentService.findAllAssignmentOfModule(this.moduleId).subscribe(assignments => {
      this.assignments = assignments;
    });
  }

  addNewMaterial() {
    this.moduleContent.module = this.currentModule;
    swal({
      title: 'Are you sure you want to add this content?',
      type: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes',
      cancelButtonText: 'Cancel'
    }).then(() => {
      this.courseService.addModuleContent(this.moduleContent).subscribe((moduleContent) => {
        this.courseService.addFile(this.file, moduleContent).subscribe((assignments) => {
          this.file = null;
        });
        swal({
          title: 'Success',
          text: 'New material added successfully',
          type: 'success',
          showCancelButton: false,
          confirmButtonText: 'OK'
        }).then(() => {
          this.moduleContent.video = "";
          this.moduleContent.videoTitle = "";
          this.moduleContent.transcript = "";
          this.moduleContent.module = null;
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
}
