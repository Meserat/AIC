import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllowanceDetailsComponent } from './allowance-details.component';

describe('AllowanceDetailsComponent', () => {
  let component: AllowanceDetailsComponent;
  let fixture: ComponentFixture<AllowanceDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllowanceDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllowanceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
