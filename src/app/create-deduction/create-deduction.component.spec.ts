import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDeductionComponent } from './create-deduction.component';

describe('CreateDeductionComponent', () => {
  let component: CreateDeductionComponent;
  let fixture: ComponentFixture<CreateDeductionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateDeductionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDeductionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
