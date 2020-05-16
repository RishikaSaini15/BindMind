import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-play-video',
  templateUrl: './play-video.component.html',
  styleUrls: ['./play-video.component.scss']
})
export class PlayVideoComponent implements OnInit {
  safeUrl: any;
  transcript: string;
  constructor(
      private dialogRef: MatDialogRef<PlayVideoComponent>,
      @Inject(MAT_DIALOG_DATA) data,
      private _sanitizer: DomSanitizer
  ) {
    this.safeUrl = this._sanitizer.bypassSecurityTrustResourceUrl(data.url);
    this.transcript = data.transcript;
  }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close('Play Youtube Video Closed');
  }
}
