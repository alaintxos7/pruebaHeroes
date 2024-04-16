import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarcrearheroeComponent } from './editarcrearheroe.component';

describe('EditarcrearheroeComponent', () => {
  let component: EditarcrearheroeComponent;
  let fixture: ComponentFixture<EditarcrearheroeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarcrearheroeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditarcrearheroeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
