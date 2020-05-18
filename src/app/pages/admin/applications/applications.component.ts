import {Component, EventEmitter, Inject, OnInit, Optional, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PopupDailogComponent} from '../../../helpers/components/popup-dailog/popup-dailog.component';
import {DialogComponent} from '../../../helpers/components/dialog/dialog.component';
import {AdminService} from '../admin.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
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

  applications: FormGroup = new FormGroup({
    applicationName: new FormControl(''),
    applicationDescription: new FormControl('')
  });

  applicationsList: any[]  = [];

  filteredApplication: Observable<any[]>;
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
    this.filteredApplication = this.applications.controls.applicationName.valueChanges
      .pipe(
        startWith(''),
        map(application => this.filterApplications(application))
      );
  }

  doAction(): void {
    this.dialogRef.close({event: this.action, data: this.applications.value});
  }

  closeDialog(){
    this.dialogRef.close({event: 'Cancel'});
  }

  private filterApplications(value: string) {
   if (this.action === 'Add') {
     this.applicationsList = this.applicationsDataSource.data;
     if (value.length >= 2) {
       return this.applicationsList.filter(option => new RegExp(value, 'gi').test(option.name));
     } else {
       this.applicationsList = this.applicationsDataSource.data;
     }
   }
  }

}
