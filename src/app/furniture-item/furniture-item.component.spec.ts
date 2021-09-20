import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnitureItemComponent } from './furniture-item.component';

describe('FurnitureItemComponent', () => {
  let component: FurnitureItemComponent;
  let fixture: ComponentFixture<FurnitureItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurnitureItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FurnitureItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
