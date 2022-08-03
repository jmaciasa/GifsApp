import { Component, ElementRef, ViewChild} from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [

  ]

})
export class BusquedaComponent {

  @ViewChild('txtbuscar') txtbuscar!:ElementRef<HTMLInputElement>;
  
  constructor(private GifsService: GifsService){

  }
  buscar() {
   const value = this.txtbuscar.nativeElement.value;
    console.log(value);

    this.GifsService.buscarGifs( value);

    this.txtbuscar.nativeElement.value = '';
  }



}
