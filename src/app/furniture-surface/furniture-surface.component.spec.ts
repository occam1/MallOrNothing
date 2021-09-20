import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FurnitureSurfaceComponent } from './furniture-surface.component';

describe('FurnitureSurfaceComponent', () => {
  let component: FurnitureSurfaceComponent;
  let fixture: ComponentFixture<FurnitureSurfaceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FurnitureSurfaceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FurnitureSurfaceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
