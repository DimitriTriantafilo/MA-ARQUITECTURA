import { Component, ElementRef, OnInit } from '@angular/core';
import { TranslatePipe } from '../../transltate/translate.pipe';

@Component({
  selector: 'app-nosotros',
  templateUrl: './nosotros.component.html',
  styleUrls: ['./nosotros.component.scss'],
  imports: [TranslatePipe],
})
export class NosotrosComponent implements OnInit {
  constructor(private el: ElementRef) {}

  ngOnInit() {}
}
