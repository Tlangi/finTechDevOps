import {Component, EventEmitter, Inject, OnInit, Optional, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {ApplicationsTableDataSource} from './applications-table/applications-table-datasource';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

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
  filteredApplicationName: Observable<any>;

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

  private checkAction() {
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
  }

  ngOnInit(): void {
    this.filteredApplicationName = this.applications.controls.applicationDescription.valueChanges
      .pipe(
        startWith(''),
        map(description => this.checkValueChange(description))
    );
    this.checkAction();
  }

  doAction(): void {
    this.dialogRef.close({event: this.action, data: this.applications.value});
  }

  closeDialog(){
    this.dialogRef.close({event: 'Cancel'});
  }

  private checkValueChange(value: string) {
    if (value.length >= 1) {
      if (this.action === 'Add') {
        this.applicationsDataSource.data.filter((name) => {
          if (name.name === this.applications.controls.applicationName.value) {
            this.nameExist = true;
          }
        });
      }
    } else {
      this.nameExist = false;
    }
  }

}
