import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllocatedTasksComponent } from './allocated-tasks.component';

describe('AllocatedTasksComponent', () => {
  let component: AllocatedTasksComponent;
  let fixture: ComponentFixture<AllocatedTasksComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllocatedTasksComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllocatedTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
