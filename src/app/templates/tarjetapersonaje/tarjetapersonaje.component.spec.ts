import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TarjetapersonajeComponent } from './tarjetapersonaje.component';

describe('TarjetapersonajeComponent', () => {
  let component: TarjetapersonajeComponent;
  let fixture: ComponentFixture<TarjetapersonajeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TarjetapersonajeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TarjetapersonajeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
