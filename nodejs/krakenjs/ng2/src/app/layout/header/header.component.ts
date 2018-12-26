import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input()
  opended: boolean;
  @Output()
  toggle = new EventEmitter<boolean>();

  doToggle() {
    this.opended = !this.opended;
    this.toggle.emit(this.opended);
  }

  constructor() { }

  ngOnInit() {
  }

}
