import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {PopupDailogComponent} from '../../../helpers/components/popup-dailog/popup-dailog.component';
import {DialogComponent} from '../../../helpers/components/dialog/dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {map, startWith} from 'rxjs/operators';
import {FormControl, FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';
import {WorkTypeDataTableDataSource} from './work-type-data-table/work-type-data-table-datasource';

@Component({
  selector: 'app-work-type',
  templateUrl: './work-type.component.html',
  styleUrls: ['./work-type.component.css']
})
export class WorkTypeComponent implements OnInit {
  @Output() sendWorkTypeValue = new EventEmitter<string>();
  datasource: WorkTypeDataTableDataSource;

  workTypeForm: FormGroup = new FormGroup({
    workType: new FormControl(''),
    workTypeDescription: new FormControl('')
  });

  workTypeList: any[]  = [];
  filteredWorkType: Observable<any[]>;
  constructor(private matDialog: MatDialog) {
    this.datasource = new WorkTypeDataTableDataSource();
  }

  ngOnInit(): void {
    this.filteredWorkType = this.workTypeForm.controls.workType.valueChanges
      .pipe(
        startWith(''),
        map(workType => this.filterWorkType(workType))
      );
  }

  private filterWorkType(value: string) {
    this.sendWorkTypeValue.emit(value);
    this.workTypeList = this.datasource.data;
    if (value.length >= 2) {
      this.workTypeForm.controls.workTypeDescription.setValue(
        this.workTypeList.filter(option => new RegExp(value, 'gi').test(option.name))[0].description
      );
      return this.workTypeList.filter(option => new RegExp(value, 'gi').test(option.name));
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
