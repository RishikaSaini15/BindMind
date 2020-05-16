import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCourseDialogComponent } from './view-course-dialog.component';

describe('ViewCourseDialogComponent', () => {
  let component: ViewCourseDialogComponent;
  let fixture: ComponentFixture<ViewCourseDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewCourseDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewCourseDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
