import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CadastroInventarioComponent } from './cadastro-inventario.component';

describe('CadastroInventarioComponent', () => {
  let component: CadastroInventarioComponent;
  let fixture: ComponentFixture<CadastroInventarioComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CadastroInventarioComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CadastroInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
