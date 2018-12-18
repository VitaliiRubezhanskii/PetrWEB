import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsByTypeComponent } from './questions-by-type.component';

describe('QuestionsByTypeComponent', () => {
  let component: QuestionsByTypeComponent;
  let fixture: ComponentFixture<QuestionsByTypeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsByTypeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsByTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
