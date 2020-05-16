import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-assign-grade',
  templateUrl: './assign-grade.component.html',
  styleUrls: ['./assign-grade.component.scss']
})
export class AssignGradeComponent implements OnInit {

  constructor(
      public dialogRef: MatDialogRef<AssignGradeComponent>,
      @Inject(MAT_DIALOG_DATA) public data) {
      console.log(data);
  }

  ngOnInit() {
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
