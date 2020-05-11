import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PopupDailogComponent} from '../../../helpers/components/popup-dailog/popup-dailog.component';
import {DialogComponent} from '../../../helpers/components/dialog/dialog.component';
import {AdminService} from '../admin.service';
import {MatDialog} from '@angular/material/dialog';
import {ApplicationsTableDataSource} from './applications-table/applications-table-datasource';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {
  @Output() sendApplicationValue = new EventEmitter<string>();
  applicationsDataSource: ApplicationsTableDataSource;

  applications: FormGroup = new FormGroup({
    applicationName: new FormControl(''),
    applicationDescription: new FormControl('')
  });

  applicationsList: any[]  = [];

  filteredApplication: Observable<any[]>;
  constructor(private adminService: AdminService,
              private matDialog: MatDialog) {
    this.applicationsDataSource = new ApplicationsTableDataSource();
  }

  ngOnInit(): void {
    this.filteredApplication = this.applications.controls.applicationName.valueChanges
      .pipe(
        startWith(''),
        map(application => this.filterApplications(application))
      );

  }

  private filterApplications(value: string) {
    this.sendApplicationValue.emit(value);
    this.applicationsList = this.applicationsDataSource.data;
    if (value.length >= 2) {
      this.applications.controls.applicationDescription.setValue(
        this.applicationsList.filter(option => new RegExp(value, 'gi').test(option.name))[0].description
      );
      return this.applicationsList.filter(option => new RegExp(value, 'gi').test(option.name));
    }
  }

  updateApplication() {
    console.log('submitted');
    const dialogRef = this.matDialog.open(PopupDailogComponent,
      {data: {tabName: this.applications.controls.applicationName.value, name: 'Application'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  removeApplication() {
    console.log('submitted');
    const dialogRef = this.matDialog.open(DialogComponent,
      {data: {tabName:  this.applications.controls.applicationName.value, name: 'Application Name'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
