import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HeroesService } from '../../services/heroes.service';
import { ComicsItem, Heroes, StoriesItem, Thumbnail } from '../../models/heroes';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import {MatListModule} from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { v4 as uuidv4 } from 'uuid';

@Component({
  selector: 'app-editarcrearheroe',
  standalone: true,
  imports: [ReactiveFormsModule, MatListModule , FormsModule],
  templateUrl: './editarcrearheroe.component.html',
  styleUrl: './editarcrearheroe.component.css'
})
export class EditarcrearheroeComponent implements OnInit {
  titulo: string = 'Editar heroe';
  heroe:Heroes
  parametro:any
  heroesForm: FormGroup;
  nombrePelicula:string=""
  nombreComic:string=""
  imagenFichero:any
  imagen:Thumbnail
  bytesDeImagen:string=""
  listaComics: ComicsItem[]=[]
  listaPeliculas: StoriesItem[]=[]
  constructor(private router: ActivatedRoute, private heroeService:HeroesService, private fb: FormBuilder,  private dialog: MatDialog, private route:Router) {

    this.parametro = this.router.snapshot.params;

    if(this.parametro['action'] == 'crear'){
      this.heroe = {
        id:uuidv4(),
        name:'',
        description:'',
        comics: {items:[]},
        stories: {items:[]},
        thumbnail: {path:"",extension:""},
        fav:false
      }
      this.titulo = 'Crear  nuevo heroe';
      this.imagen={path:"",extension:""}
      this.initForm(true)
    }else{
      this.titulo = 'Editar heroe'
      this.heroe = this.heroeService.getHeroe(this.parametro['id'])
      this.listaComics = this.heroe.comics.items
      this.listaPeliculas = this.heroe.stories.items
      this.imagen=this.heroe.thumbnail
      this.initForm(false)
  }
  }
  ngOnInit(){

  }

  initForm(inicializar:boolean): void {
    if(inicializar){
      this.heroesForm = this.fb.group({
        description: ['', Validators.required],
        name: ['', Validators.required]
      });

    }else{
    this.heroesForm = this.fb.group({
      description: [this.heroe.description, Validators.required],
      name: [this.heroe.name, Validators.required]

    });
  }
  }

  subirArchivo(event: any) {

        const archivo = event.target.files[0];
        const lector = new FileReader();
        lector.onload = (e: any) => {
           this.bytesDeImagen = e.target.result;

          this.imagen={
            path:this.bytesDeImagen,
            extension:'blob'
          }
        };

        lector.readAsDataURL(archivo);
      }

  onSubmit(): void {
    if (this.heroesForm.valid) {
      const formData = this.heroesForm.value as Heroes;
      this.heroe.comics.items=this.listaComics
      this.heroe.stories.items=this.listaPeliculas
      this.heroe.thumbnail=this.imagen
      this.heroe.name=formData.name
      this.heroe.description=formData.description
      if(this.parametro['action'] == 'crear'){
        this.heroe.fav=false
      this.heroe.id= uuidv4();
      console.log(this.heroe);
      this.heroeService.crearHeroe(this.heroe)
      }else{
        this.heroeService.editarHeroe(this.heroe)
      }
      this.route.navigate(['/lista'])
    } else {
      this.heroesForm.markAllAsTouched();
    }
  }
  anadirPelicula(nombre:string){
    this.listaPeliculas.push({name:nombre})
    this.nombrePelicula=''
  }

  anadirComic(nombre:string){
    this.listaComics.push({name:nombre})
    this.nombreComic=''
  }

  eliminarComic(nombre:string){
    const dialogRef = this.dialog.open(DialogAnimationsComicDialog);
    dialogRef.afterClosed().subscribe((result: any) => {
    if(result) {
      this.listaComics = this.listaComics.filter(x=>x.name != nombre)!
    }
    });
  }

  eliminarpelicula(nombre:string){
    const dialogRef = this.dialog.open(DialogAnimationsPeliculaDialog);
    dialogRef.afterClosed().subscribe((result: any) => {
    if(result) {
      this.listaPeliculas = this.listaPeliculas.filter(x=>x.name != nombre)!
    }
    });
  }
}

@Component({
  selector: 'dialog-animations-comic-dialog',
  template: `<h2 mat-dialog-title>Borrar comic</h2>
  <mat-dialog-content>¿Te gustaria eliminar este comic?</mat-dialog-content>
  <mat-dialog-actions>
      <button (click)="closeDialog(false)"  mat-button mat-dialog-close>No</button>
      <button (click)="closeDialog(true)" mat-button mat-dialog-close cdkFocusInitial>Si</button>
   </mat-dialog-actions>`,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsComicDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsComicDialog>) {}
  closeDialog(res:boolean) {
    this.dialogRef.close(res);
  }
}


@Component({
  selector: 'dialog-animations-pelicula-dialog',
  template: `<h2 mat-dialog-title>Borrar pelicula</h2>
  <mat-dialog-content>¿Te gustaria eliminar esta pelicula?</mat-dialog-content>
  <mat-dialog-actions>
      <button (click)="closeDialog(false)"  mat-button mat-dialog-close>No</button>
      <button (click)="closeDialog(true)" mat-button mat-dialog-close cdkFocusInitial>Si</button>
   </mat-dialog-actions>`,
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
})
export class DialogAnimationsPeliculaDialog {
  constructor(public dialogRef: MatDialogRef<DialogAnimationsPeliculaDialog>) {}
  closeDialog(res:boolean) {
    this.dialogRef.close(res);
  }
}


