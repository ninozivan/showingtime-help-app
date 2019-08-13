import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsAdministrationPage } from './tags-administration.page';

describe('TagsAdministrationPage', () => {
  let component: TagsAdministrationPage;
  let fixture: ComponentFixture<TagsAdministrationPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsAdministrationPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsAdministrationPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
