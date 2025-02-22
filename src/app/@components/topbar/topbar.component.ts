import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.component.html',
  styleUrl: './topbar.component.scss'
})
export class TopbarComponent implements OnInit {
  isMobile: boolean = true;
  
  constructor() {}

  ngOnInit() {

  }

}
