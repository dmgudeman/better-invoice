import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemDetailOneComponent } from './item-detail-one.component';

describe('ItemDetailOneComponent', () => {
  let component: ItemDetailOneComponent;
  let fixture: ComponentFixture<ItemDetailOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ItemDetailOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemDetailOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
