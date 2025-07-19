import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  loadVideo: boolean = false;
  ngOnInit() {
    setTimeout(() => {
      this.loadVideo = true;
    }, 4000);
    // this.optimizeProjectImages();
  }
}
