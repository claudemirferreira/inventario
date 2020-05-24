import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportXlsComponent } from './import-xls.component';

describe('ImportXlsComponent', () => {
  let component: ImportXlsComponent;
  let fixture: ComponentFixture<ImportXlsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportXlsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportXlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
