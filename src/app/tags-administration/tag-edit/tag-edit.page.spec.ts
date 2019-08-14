import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagEditPage } from './tag-edit.page';

describe('TagEditPage', () => {
  let component: TagEditPage;
  let fixture: ComponentFixture<TagEditPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagEditPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
