import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagTypesPage } from './tag-types.page';

describe('TagTypesPage', () => {
  let component: TagTypesPage;
  let fixture: ComponentFixture<TagTypesPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagTypesPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagTypesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
