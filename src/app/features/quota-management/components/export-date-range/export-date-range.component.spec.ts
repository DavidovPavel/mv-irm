import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExportDateRangeComponent } from './export-date-range.component';

describe('ExportDateRangeComponent', () => {
  let component: ExportDateRangeComponent;
  let fixture: ComponentFixture<ExportDateRangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExportDateRangeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExportDateRangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
