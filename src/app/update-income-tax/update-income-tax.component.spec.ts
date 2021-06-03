import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateIncomeTaxComponent } from './update-income-tax.component';

describe('UpdateIncomeTaxComponent', () => {
  let component: UpdateIncomeTaxComponent;
  let fixture: ComponentFixture<UpdateIncomeTaxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdateIncomeTaxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateIncomeTaxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
