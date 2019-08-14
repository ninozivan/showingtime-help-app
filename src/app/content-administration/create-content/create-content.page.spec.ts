import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateContentPage } from './create-content.page';

describe('CreateContentPage', () => {
  let component: CreateContentPage;
  let fixture: ComponentFixture<CreateContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateContentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
