import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewContentPage } from './view-content.page';

describe('ViewContentPage', () => {
  let component: ViewContentPage;
  let fixture: ComponentFixture<ViewContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewContentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
