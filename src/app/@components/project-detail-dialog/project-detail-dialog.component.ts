import {
  Component,
  inject,
  HostListener,
  OnInit,
  PLATFORM_ID,
  Inject,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { Project } from '../../app.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '../../transltate/translate.pipe';
import { MatIconModule } from '@angular/material/icon';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-project-detail-dialog',
  templateUrl: './project-detail-dialog.component.html',
  styleUrls: ['./project-detail-dialog.component.scss'],
  imports: [
    MatDialogModule,
    CommonModule,
    NgOptimizedImage,
    TranslatePipe,
    MatIconModule,
  ],
})
export class ProjectDetailDialogComponent implements OnInit {
  public innerWidth: number = 0;

  [x: string]: any;
  dialogRef = inject(MatDialogRef<ProjectDetailDialogComponent>);
  readonly data = inject<Project>(MAT_DIALOG_DATA);

  onClose(): void {
    this.dialogRef.close();
  }

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    if (isPlatformBrowser(this.platformId)) {
      this.innerWidth = window.innerWidth;
    }
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.innerWidth = window.innerWidth;
    }
  }
}
