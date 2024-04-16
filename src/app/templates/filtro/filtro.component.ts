import { Component, EventEmitter, Input, Output } from '@angular/core';


import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Heroes } from '../../models/heroes';

interface AutoCompleteCompleteEvent {
  originalEvent: Event;
  query: string;
}
@Component({
  selector: 'app-filtro',
  standalone: true,
  imports: [ CommonModule, FormsModule],
  templateUrl: './filtro.component.html',
  styleUrl: './filtro.component.css'
})
export class FiltroComponent {
  @Input() heroes: Heroes[]=[] ;
heroesFiltrados:Heroes[]=[];
nombreHeroe:string="";
@Output() nombreSeleccionado = new EventEmitter<string>();


cambioNombre(event:any) {

  this.nombreSeleccionado.emit(this.nombreHeroe);
}
}
