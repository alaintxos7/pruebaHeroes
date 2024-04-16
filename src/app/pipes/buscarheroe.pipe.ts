import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'buscarheroe',
  standalone:true
})
export class BuscarheroePipe implements PipeTransform {

  transform(value: any, arg: any): any {
    if(arg == '' || arg.length < 3 ) return value
    let resultadoHeroes= []
    for(const heroe of value){
      if(heroe.name.toLowerCase().indexOf(arg.toLowerCase()) > -1){
        resultadoHeroes.push(heroe)
      }
    }
    return resultadoHeroes;
  }


}
