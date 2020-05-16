import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {User} from '../../../models/user';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.scss']
})
export class ViewStudentComponent implements OnInit {
  student: any;
  constructor(private dialogRef: MatDialogRef<ViewStudentComponent>,
              @Inject(MAT_DIALOG_DATA) data) {
    this.student = data.student;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close('Play Youtube Video Closed');
  }

}
