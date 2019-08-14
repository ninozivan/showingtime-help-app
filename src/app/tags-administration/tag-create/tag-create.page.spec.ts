import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TagCreatePage } from './tag-create.page';

describe('TagCreatePage', () => {
  let component: TagCreatePage;
  let fixture: ComponentFixture<TagCreatePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TagCreatePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TagCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
