import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaheroesComponent } from './listaheroes.component';

describe('ListaheroesComponent', () => {
  let component: ListaheroesComponent;
  let fixture: ComponentFixture<ListaheroesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaheroesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaheroesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
