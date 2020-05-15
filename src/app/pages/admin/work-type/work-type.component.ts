import {Component, EventEmitter, Inject, OnInit, Optional, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
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
  workType: string;
  workTypeDescription: string;
  action: string;

  workTypeList: any[]  = [];
  filteredWorkType: Observable<any[]>;
  constructor(private dialogRef: MatDialogRef<WorkTypeComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) data) {
    this.datasource = new WorkTypeDataTableDataSource();
    this.workType = data.name;
    this.workTypeDescription = data.description;
    this.action = data.action;
  }

  ngOnInit(): void {
    this.workTypeForm.setValue({
      workType: this.workType,
      workTypeDescription: this.workTypeDescription
    });
    this.filteredWorkType = this.workTypeForm.controls.workType.valueChanges
      .pipe(
        startWith(''),
        map(workType => this.filterWorkType(workType))
      );
  }

  doAction(): void {
    this.dialogRef.close({event: this.action, data: this.workTypeForm});
  }

  closeDialog(){
    this.dialogRef.close({event: 'Cancel'});
  }

  private filterWorkType(value: string) {
    this.sendWorkTypeValue.emit(value);
    this.workTypeList = this.datasource.data;
    if (value.length >= 2) {
      this.workTypeForm.controls.workTypeDescription.setValue(
        this.workTypeList.filter(option =>
          new RegExp(value, 'gi').test(option.name))[0].description
      );
      return this.workTypeList.filter(option => new RegExp(value, 'gi').test(option.name));
    } else {
      this.workTypeForm.controls.workTypeDescription.setValue(
        ''
      );
      return;
    }
  }

}
