import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePositionComponent } from './update-position.component';

describe('UpdatePositionComponent', () => {
  let component: UpdatePositionComponent;
  let fixture: ComponentFixture<UpdatePositionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePositionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePositionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
