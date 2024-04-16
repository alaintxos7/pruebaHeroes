import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Heroes } from '../../models/heroes';
import { HeroesService } from '../../services/heroes.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Router } from '@angular/router';
@Component({
  selector: 'app-tarjetapersonaje',
  standalone: true,
  imports: [MatCardModule, MatButtonModule ],
  templateUrl: './tarjetapersonaje.component.html',
  styleUrl: './tarjetapersonaje.component.css'
})
export class TarjetapersonajeComponent {

@Input() heroe: Heroes;
@Output() eliminarHeroes = new EventEmitter<any>();

constructor(private heroeService:HeroesService,  public dialog: MatDialog, private router: Router){}

  modificarFav(heroe:Heroes){
    heroe.fav = !heroe.fav;
    this.heroeService.modificarFav(heroe)
  }
  irADetalle(id:string){
    this.router.navigate(['/detalle', id]);
  }

  eliminarHeroe(id:string){
    const dialogRef = this.dialog.open(DialogAnimationsExampleDialog);
    dialogRef.afterClosed().subscribe((result: any) => {
      var resp={
        id:id,
        result:result
      }
     this.eliminarHeroes.emit(resp)

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
