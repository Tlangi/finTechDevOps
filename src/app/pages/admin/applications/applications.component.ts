import {Component, EventEmitter, Inject, OnInit, Optional, Output, SimpleChanges} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApplicationsTableDataSource} from './applications-table/applications-table-datasource';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  @Output() sendApplicationValue = new EventEmitter<string>();
  applicationsDataSource: ApplicationsTableDataSource;
  action: string;
  applicationName: string;
  applicationDescription: string;
  nameExist = false;

  applications: FormGroup = new FormGroup({
    applicationName: new FormControl(''),
    applicationDescription: new FormControl('')
  });

  constructor(private dialogRef: MatDialogRef<ApplicationsComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) data) {
    this.applicationsDataSource = new ApplicationsTableDataSource();
    this.applicationName = data.name;
    this.applicationDescription = data.description;
    this.action = data.action;
  }

  ngOnInit(): void {
    if (this.action === 'Update') {
      this.applications.setValue({
        applicationName: this.applicationName,
        applicationDescription: this.applicationDescription
      });
    } else if (this.action === 'Delete') {
      this.applications.setValue({
        applicationName: this.applicationName,
        applicationDescription: this.applicationDescription
      });
    }
    this.checkValueChange();
  }

  doAction(): void {
    this.dialogRef.close({event: this.action, data: this.applications.value});
  }

  closeDialog(){
    this.dialogRef.close({event: 'Cancel'});
  }

  private checkValueChange() {
    console.log(this.applications.controls.applicationDescription.value);
  }

}
