import { Component, Input, OnInit } from '@angular/core';
import { Project } from '../../app.component';
import { CommonModule, NgOptimizedImage } from '@angular/common';

@Component({
  selector: 'app-project-display',
  templateUrl: './project-display.component.html',
  styleUrls: ['./project-display.component.scss'],
  imports: [CommonModule, NgOptimizedImage],
})
export class ProjectDisplayComponent implements OnInit {
  @Input() project!: Project;
  @Input() index!: number;

  hovering: boolean = false;

  constructor() {}

  ngOnInit() {}
}
