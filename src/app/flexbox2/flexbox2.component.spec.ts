import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Flexbox2Component } from './flexbox2.component';

describe('Flexbox2Component', () => {
  let component: Flexbox2Component;
  let fixture: ComponentFixture<Flexbox2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ Flexbox2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(Flexbox2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
