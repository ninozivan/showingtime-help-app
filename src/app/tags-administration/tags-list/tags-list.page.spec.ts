import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagsListPage } from './tags-list.page';

describe('TagsListPage', () => {
  let component: TagsListPage;
  let fixture: ComponentFixture<TagsListPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagsListPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagsListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
