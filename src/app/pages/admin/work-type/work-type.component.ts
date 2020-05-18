import {Component, EventEmitter, Inject, OnInit, Optional, Output} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
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
  nameExist: boolean;
  action: string;

  workTypeList: any[]  = [];
  filteredWorkTypeDescription: Observable<any>;
  constructor(private dialogRef: MatDialogRef<WorkTypeComponent>,
              @Optional() @Inject(MAT_DIALOG_DATA) data) {
    this.datasource = new WorkTypeDataTableDataSource();
    this.workType = data.name;
    this.workTypeDescription = data.description;
    this.action = data.action;
  }

  private checkAction() {
    if (this.action === 'Update') {
      this.workTypeForm.setValue({
        workType: this.workType,
        workTypeDescription: this.workTypeDescription
      });
    } else if (this.action === 'Delete') {
      this.workTypeForm.setValue({
        workType: this.workType,
        workTypeDescription: this.workTypeDescription
      });
    }
  }

  ngOnInit(): void {
    this.filteredWorkTypeDescription = this.workTypeForm.controls.workTypeDescription.valueChanges
      .pipe(
        startWith(''),
        map(description => this.checkFilterValue(description))
      );
    this.checkAction();
  }

  doAction(): void {
    this.dialogRef.close({event: this.action, data: this.workTypeForm.value});
  }

  closeDialog(){
    this.dialogRef.close({event: 'Cancel'});
  }

  private checkFilterValue(value: string) {
    this.workTypeList = this.datasource.data;
    if (value.length >= 1) {
      if (this.action === 'Add') {
        this.datasource.data.filter((name, key) => {
          if (name.name === this.workTypeForm.controls.workType.value) {
            this.nameExist = true;
          }
        });
      }
    } else {
      this.nameExist = false;
    }
  }

}
