import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { TranslatePipe } from '../../transltate/translate.pipe';
@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss'],
  imports: [TranslatePipe],
})
export class NosotrosComponent implements OnInit {
  public innerWidth: any;

  constructor(private el: ElementRef) {}

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.innerWidth = window.innerWidth;
  }
  ngOnInit() {
    this.innerWidth = window.innerWidth;
  }
}
