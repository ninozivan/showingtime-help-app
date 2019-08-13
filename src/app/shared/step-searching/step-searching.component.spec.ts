import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StepSearchingComponent } from './step-searching.component';

describe('StepSearchingComponent', () => {
  let component: StepSearchingComponent;
  let fixture: ComponentFixture<StepSearchingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StepSearchingComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StepSearchingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
