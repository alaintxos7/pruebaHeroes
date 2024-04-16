import { Routes } from '@angular/router';
import { ListaheroesComponent } from './components/listaheroes/listaheroes.component';

import { DetalleheroeComponent } from './components/detalleheroe/detalleheroe.component';
import { EditarcrearheroeComponent } from './components/editarcrearheroe/editarcrearheroe.component';

export const routes: Routes = [
  {path: '', redirectTo: '/lista', pathMatch: 'full'},
  {path: 'lista', component: ListaheroesComponent },
  {path: 'detalle/:id', component:DetalleheroeComponent},
  {path: 'formulario', component:EditarcrearheroeComponent}
];
