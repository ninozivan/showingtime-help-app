import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditContentPage } from './edit-content.page';

describe('EditContentPage', () => {
  let component: EditContentPage;
  let fixture: ComponentFixture<EditContentPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditContentPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditContentPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
