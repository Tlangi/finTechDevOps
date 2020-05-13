import {Component, Inject, OnInit, Optional} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

export interface UserData {
  name: string;
  team: string;
  status: string;
  id: number;
}

@Component({
  selector: 'app-admin-dialog-box',
  templateUrl: './admin-dialog-box.component.html',
  styleUrls: ['./admin-dialog-box.component.css']
})
export class AdminDialogBoxComponent implements OnInit {
  action: string;
  localData: any;

  constructor(public dialogRef: MatDialogRef<AdminDialogBoxComponent>,
              // @Optional() is used to prevent error if no data is passed
              @Optional() @Inject(MAT_DIALOG_DATA) public data: UserData
              ) {
    console.log(data);
    this.localData = {...data};
    this.action = this.localData.action;
  }

  doAction() {
    this.dialogRef.close({event: this.action, data: this.localData});
  }

  closeDialog() {
    this.dialogRef.close({event: 'Cancel'});
  }

  ngOnInit(): void {
  }

}
