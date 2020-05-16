import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentAssignmentHomeComponent } from './student-assignment-home.component';

describe('StudentAssignmentHomeComponent', () => {
  let component: StudentAssignmentHomeComponent;
  let fixture: ComponentFixture<StudentAssignmentHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentAssignmentHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentAssignmentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
