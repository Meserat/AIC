import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectorateListComponent } from './directorate-list.component';

describe('DirectorateListComponent', () => {
  let component: DirectorateListComponent;
  let fixture: ComponentFixture<DirectorateListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DirectorateListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectorateListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
