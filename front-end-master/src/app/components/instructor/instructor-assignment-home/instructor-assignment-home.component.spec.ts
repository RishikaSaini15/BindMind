import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InstructorAssignmentHomeComponent } from './instructor-assignment-home.component';

describe('InstructorAssignmentHomeComponent', () => {
  let component: InstructorAssignmentHomeComponent;
  let fixture: ComponentFixture<InstructorAssignmentHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorAssignmentHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InstructorAssignmentHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
