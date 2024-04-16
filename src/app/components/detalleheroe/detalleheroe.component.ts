import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { Heroes } from '../../models/heroes';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';

@Component({
  selector: 'app-detalleheroe',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './detalleheroe.component.html',
  styleUrl: './detalleheroe.component.css'
})
export class DetalleheroeComponent {
  heroeSeleccionado:Heroes
  constructor(private route: ActivatedRoute, private heroeService:HeroesService, public dialog: MatDialog, private router: Router) {
    let id = this.route.snapshot.params['id'];
    this.heroeSeleccionado= this.heroeService.getHeroe(id);
  }

  modificarFav(heroe:Heroes){
    heroe.fav = !heroe.fav;
    this.heroeService.modificarFav(heroe)
  }
  editarHeroe(id:string){
    this.router.navigate(['/formulario', { id: id, action: 'editar' }])
  }

  eliminarHeroe(){
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog);
    dialogRef.afterClosed().subscribe((result: any) => {
if(result) {this.heroeService.eliminarHeroe(this.heroeSeleccionado.id)
  this.router.navigate(['/lista'])
}


    });
  }
}

@Component({
  selector: 'dialog-animations-example-dialog',
  template: `<h2 mat-dialog-title>Borrar heroe</h2>
  <mat-dialog-content>¿Te gustaria eliminar a este heroe?</mat-dialog-content>
  <mat-dialog-actions>
      <button (click)="closeDialog(false)"  mat-button mat-dialog-close>No</button>
      <button (click)="closeDialog(true)" mat-button mat-dialog-close cdkFocusInitial>Si</button>
   </mat-dialog-actions>`,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsExampleDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsExampleDialog>) {}
  closeDialog(res:boolean) {
    this.dialogRef.close(res);
  }
}
