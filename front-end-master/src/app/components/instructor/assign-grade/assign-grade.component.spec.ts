import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssignGradeComponent } from './assign-grade.component';

describe('AssignGradeComponent', () => {
  let component: AssignGradeComponent;
  let fixture: ComponentFixture<AssignGradeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssignGradeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssignGradeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
