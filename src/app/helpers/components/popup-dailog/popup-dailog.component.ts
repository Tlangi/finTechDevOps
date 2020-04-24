import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-popup-dailog',
  templateUrl: './popup-dailog.component.html',
  styleUrls: ['./popup-dailog.component.css']
})
export class PopupDailogComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

}
