import {Component, Inject, OnInit} from '@angular/core';
import {User} from '../../../models/user';
import {Module} from '../../../models/modules';
import {VERSION, MatDialog, MatDialogRef} from '@angular/material';
import {ActivatedRoute} from '@angular/router';
import {CourseService} from '../../../services/course.service';
import {ModuleContent} from '../../../models/modulecontent';
import {PlayVideoComponent} from '../play-video/play-video.component';
import {MatDialogConfig} from '@angular/material/dialog';
import {AssignmentService} from '../../../services/assignment.service';
import {Assignment} from '../../../models/assignment';
import * as fileSaver from 'file-saver';

@Component({
  selector: 'app-student-module-details',
  templateUrl: './student-module-details.component.html',
  styleUrls: ['./student-module-details.component.scss']
})
export class StudentModuleDetailsComponent implements OnInit {
  currentStudent: User;
  currentModule: Module;
  moduleContents: Array<ModuleContent>;
  moduleId: string;
  innerWidth: number;
  assignments: Array<Assignment>;
  constructor(private route: ActivatedRoute, private courseService: CourseService, private dialog: MatDialog, private assignmentService: AssignmentService) {
    this.currentStudent = JSON.parse(localStorage.getItem("currentUser"));
  }
  ngOnInit() {
    this.innerWidth = window.innerWidth;
    this.route.paramMap.subscribe(params => {
      if(params.has('moduleId')){
        this.moduleId = params.get('moduleId');
      }
      if(this.moduleId || this.currentStudent) {
        this.getModule();
        this.findModuleContent();
        this.getAllAssignments()
      }
    });
  }

  findModuleContent(){
    this.courseService.findModuleContent(this.moduleId).subscribe(data => {
      this.moduleContents = data;
    });
  }

  getModule() {
    this.courseService.getModuleById(this.moduleId).subscribe(module => {
      this.currentModule = module;
    });
  }

  download(moduleContent) {
    this.courseService.downloadMaterial(moduleContent.file)
        .subscribe(response => {
          const fileName = moduleContent.file.substring(moduleContent.file.lastIndexOf("/") + 1);
          const file = new Blob([response], { type: 'application/pdf' });
          const fileURL = URL.createObjectURL(file);
          window.open(fileURL);
           fileSaver.saveAs(fileURL, fileName);
        });
  }

  open(moduleContent) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;

    let relativeWidth = (this.innerWidth * 80) / 100; // take up to 80% of the screen size
    if (this.innerWidth > 1500) {
      relativeWidth = (1500 * 80 ) / 100;
    } else {
      relativeWidth = (this.innerWidth * 80 ) / 100;
    }

    const relativeHeight = (relativeWidth * 10) / 16 + 120; // 16:9 to which we add 120 px for the dialog action buttons ("close")
    dialogConfig.width = relativeWidth + 'px';
    dialogConfig.height = relativeHeight + 'px';

    dialogConfig.data = {
      url: moduleContent.video,
      transcript: moduleContent.transcript
    }

    const dialogRef = this.dialog.open(PlayVideoComponent, dialogConfig);
  }

  getAllAssignments(){
    this.assignmentService.findAllAssignmentOfModule(this.moduleId).subscribe(assignments => {
      this.assignments = assignments;
    });
  }
}
