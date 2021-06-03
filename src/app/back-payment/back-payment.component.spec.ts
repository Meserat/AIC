import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BackPaymentComponent } from './back-payment.component';

describe('BackPaymentComponent', () => {
  let component: BackPaymentComponent;
  let fixture: ComponentFixture<BackPaymentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BackPaymentComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BackPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
