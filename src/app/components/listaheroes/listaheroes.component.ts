import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service';
import { Heroes } from '../../models/heroes';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Observable} from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { BuscarheroePipe } from '../../pipes/buscarheroe.pipe';
import { FiltroComponent } from '../../templates/filtro/filtro.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatDialog,  MatDialogModule} from '@angular/material/dialog';
import { TarjetapersonajeComponent } from '../../templates/tarjetapersonaje/tarjetapersonaje.component';
import { Router } from '@angular/router';
@Component({
  selector: 'app-listaheroes',
  standalone: true,
  imports: [MatCardModule, MatButtonModule,  FormsModule, MatFormFieldModule,ReactiveFormsModule,
    FiltroComponent,  AsyncPipe, BuscarheroePipe, MatDialogModule , MatProgressSpinnerModule, TarjetapersonajeComponent],
  templateUrl: './listaheroes.component.html',
  styleUrl: './listaheroes.component.css'
})
export class ListaheroesComponent implements OnInit {
  listaHeroes:any
  nombreHeroe:string=""
  cargandoImagenes: boolean = true;
  heroeSeleccionado:string = "ALL";
  listaNombres: Observable<string[]>;
  filtroNombre = new FormControl('');
  constructor(private heroesService:HeroesService, private dialog: MatDialog, private router:Router) {
     this.cargandoImagenes = true;
    setTimeout(() => {
      this.cargandoImagenes = false;
    }, 2000);
   }
  ngOnInit(){
    this.listaHeroes=this.heroesService.getHeroes();
  }

  filtrarNombre(nombre:any){
    this.nombreHeroe= nombre;
  }

  eliminarHeroe(resp:any){
      if(resp.result){
        this.listaHeroes=this.listaHeroes.filter((heroe: Heroes)=>heroe.id!==resp.id)
        this.heroesService.eliminarHeroe(resp.id)
      }
  }
  crearNuevoHeroe(){
    this.router.navigate(['/formulario', { id: '', action: 'crear' }])
  }

}

