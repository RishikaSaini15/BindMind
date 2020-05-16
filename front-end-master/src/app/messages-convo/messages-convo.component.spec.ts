import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MessagesConvoComponent } from './messages-convo.component';

describe('MessagesConvoComponent', () => {
  let component: MessagesConvoComponent;
  let fixture: ComponentFixture<MessagesConvoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MessagesConvoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MessagesConvoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
