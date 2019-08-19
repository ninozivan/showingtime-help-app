import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InitialSearchMsgComponent } from './initial-search-msg.component';

describe('InitialSearchMsgComponent', () => {
  let component: InitialSearchMsgComponent;
  let fixture: ComponentFixture<InitialSearchMsgComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InitialSearchMsgComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InitialSearchMsgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
