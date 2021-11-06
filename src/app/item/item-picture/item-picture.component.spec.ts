import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPictureComponent } from './item-picture.component';

describe('ItemPictureComponent', () => {
  let component: ItemPictureComponent;
  let fixture: ComponentFixture<ItemPictureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPictureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemPictureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
