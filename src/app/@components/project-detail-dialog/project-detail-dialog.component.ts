import { Component, inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { Project } from '../../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-detail-dialog',
  templateUrl: './project-detail-dialog.component.html',
  styleUrls: ['./project-detail-dialog.component.scss'],
  imports: [ 
    MatDialogModule,
    CommonModule
  ]
})
export class ProjectDetailDialogComponent implements OnInit {
  dialogRef = inject(MatDialogRef<ProjectDetailDialogComponent>);
  readonly data = inject<Project>(MAT_DIALOG_DATA);

  onClose(): void {
    this.dialogRef.close();
  }

  constructor() { }

  ngOnInit() {
    console.log(this.data);
  }

}
