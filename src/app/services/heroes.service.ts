import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Heroes } from '../models/heroes';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
listaHeroes:Heroes[]=[]
constructor(private http:HttpClient) { }


rellenarLocalStorage(){
 this.http.get<Heroes>('../assets/data/heroes.json').subscribe((data:any)=>{
  if(!localStorage.getItem('heroes')){
    localStorage.setItem('heroes',JSON.stringify(data.results))
  }
})
}

getHeroes():Observable<Heroes[]>{
this.recuperarDatos()
return JSON.parse(localStorage.getItem('heroes')!)
}

modificarFav(heroe:Heroes){
  this.recuperarDatos()
   this.listaHeroes.find((h:Heroes) => h.id == heroe.id)!.fav=heroe.fav
    localStorage.setItem('heroes',JSON.stringify(this.listaHeroes))
}

eliminarHeroe(id:string){
  this.recuperarDatos()
  this.listaHeroes=this.listaHeroes.filter(heroe=>heroe.id!==id)
  localStorage.setItem('heroes',JSON.stringify(this.listaHeroes))
}

getHeroe(id:string):Heroes{
 this.recuperarDatos()
 return this.listaHeroes.find(heroe=>heroe.id==id)!
}

recuperarDatos(){
  this.listaHeroes=JSON.parse(localStorage.getItem('heroes')!)
}

editarHeroe(heroe:Heroes){
  this.recuperarDatos()
  const indice = this.listaHeroes.findIndex((h: Heroes) => h.id === heroe.id);
  if (indice !== -1) {
    this.listaHeroes[indice] = { ...heroe };
    console.log(this.listaHeroes);
    localStorage.setItem('heroes', JSON.stringify(this.listaHeroes));

  }
}

crearHeroe(heroe:Heroes){
this.recuperarDatos()
this.listaHeroes.push(heroe)
   localStorage.setItem('heroes',JSON.stringify(this.listaHeroes))
}
}
