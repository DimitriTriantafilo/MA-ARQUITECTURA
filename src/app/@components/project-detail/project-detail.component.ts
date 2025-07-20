import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../app.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';
import { TranslatePipe } from '../../transltate/translate.pipe';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-project-detail',
  imports: [CommonModule, NgOptimizedImage, TranslatePipe, MatIconModule],
  templateUrl: './project-detail.component.html',
  styleUrl: './project-detail.component.scss',
})
export class ProjectDetailComponent implements OnInit {
  data: Project | undefined;
  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    const projectData: Project = this.route.snapshot.data['project'];
    this.data = projectData;
    console.log('Datos del proyecto:', projectData);
  }
}
