import {Component, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {PopupDailogComponent} from '../../../helpers/components/popup-dailog/popup-dailog.component';
import {DialogComponent} from '../../../helpers/components/dialog/dialog.component';
import {AdminService} from '../admin.service';
import {MatDialog} from '@angular/material/dialog';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-applications',
  templateUrl: './applications.component.html',
  styleUrls: ['./applications.component.css']
})
export class ApplicationsComponent implements OnInit {

  applications: FormGroup = new FormGroup({
    applicationName: new FormControl(''),
    applicationDescription: new FormControl('')
  });

  applicationsList: any[]  = [];

  filteredApplication: Observable<any[]>;
  constructor(private adminService: AdminService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.filteredApplication = this.applications.controls.applicationName.valueChanges
      .pipe(
        startWith(''),
        map(application => this.filterApplications(application))
      );

  }

  private filterApplications(value: string) {
    this.adminService.getApplications().subscribe(data => {
      this.applicationsList = data;
    });
    if (value.length >= 2) {
      return this.applicationsList.filter(option => new RegExp(value).test(option.applicationName));
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
