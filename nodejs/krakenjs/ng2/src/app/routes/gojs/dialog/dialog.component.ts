import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  get title() {
    return this.data.title || '提示框';
  }

  get content() {
    return this.data.content || '内容框';
  }

  sure() {
    
  }


  constructor(@Inject(MAT_DIALOG_DATA) private data: any) { }

  ngOnInit() {
  }

}