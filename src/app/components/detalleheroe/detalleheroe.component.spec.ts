import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleheroeComponent } from './detalleheroe.component';

describe('DetalleheroeComponent', () => {
  let component: DetalleheroeComponent;
  let fixture: ComponentFixture<DetalleheroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalleheroeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DetalleheroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
