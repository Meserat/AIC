import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateIncomeTaxComponent } from './create-income-tax.component';

describe('CreateIncomeTaxComponent', () => {
  let component: CreateIncomeTaxComponent;
  let fixture: ComponentFixture<CreateIncomeTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateIncomeTaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateIncomeTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
