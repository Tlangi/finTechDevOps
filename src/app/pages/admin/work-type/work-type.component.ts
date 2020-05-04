import {Component, OnInit} from '@angular/core';
import {PopupDailogComponent} from '../../../helpers/components/popup-dailog/popup-dailog.component';
import {DialogComponent} from '../../../helpers/components/dialog/dialog.component';
import {AdminService} from '../admin.service';
import {MatDialog} from '@angular/material/dialog';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-work-type',
  templateUrl: './work-type.component.html',
  styleUrls: ['./work-type.component.css']
})
export class WorkTypeComponent implements OnInit {

  workTypeForm: FormGroup = new FormGroup({
    workType: new FormControl(''),
    workTypeDescription: new FormControl('')
  });

  workTypeList: any[]  = [];
  filteredWorkType: Observable<any[]>;
  constructor(private adminService: AdminService,
              private matDialog: MatDialog) { }

  ngOnInit(): void {
    this.filteredWorkType = this.workTypeForm.controls.workType.valueChanges
      .pipe(
        startWith(''),
        map(workType => this.filterWorkType(workType))
      );
  }

  private filterWorkType(value: string) {
    this.adminService.getWorkType().subscribe(data => {
      this.workTypeList = data;
    });
    if (value.length >= 2) {
      return this.workTypeList.filter(option => new RegExp(value).test(option.workTypeState));
    }
  }
  updateWorkType() {
    console.log('submitted');
    const dialogRef = this.matDialog.open(PopupDailogComponent,
      {data: {tabName: this.workTypeForm.controls.workType.value, name: 'Work Type'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  removeWorkType() {
    console.log('submitted');
    const dialogRef = this.matDialog.open(DialogComponent,
      {data: {tabName: this.workTypeForm.controls.workType.value, name: 'Work Type'}});

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
