import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StudentModuleDetailsComponent } from './student-module-details.component';

describe('StudentModuleDetailsComponent', () => {
  let component: StudentModuleDetailsComponent;
  let fixture: ComponentFixture<StudentModuleDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StudentModuleDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StudentModuleDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
