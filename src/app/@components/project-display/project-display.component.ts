import { Component, Input, OnInit,  } from '@angular/core';
import { Project } from '../../app.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-project-display',
  templateUrl: './project-display.component.html',
  styleUrls: ['./project-display.component.scss'],
  imports: [CommonModule]
})
export class ProjectDisplayComponent implements OnInit {

  @Input() project!: Project;

  hovering: boolean = false;

  constructor() { }

  ngOnInit() {
  }

}
