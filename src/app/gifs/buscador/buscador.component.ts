import {Component, ElementRef, ViewChild} from '@angular/core';
import {GifsService} from "../services/gifs.service";

@Component({
  selector: 'app-buscador',
  templateUrl: './buscador.component.html',
  styles: []
})
export class BuscadorComponent {
  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>;

  constructor(private readonly gifService: GifsService) {
  }

  handleSearch() {
    const {value} = this.txtBuscar.nativeElement
    this.gifService.buscarGifs(value);
    this.txtBuscar.nativeElement.value = ''
  }

}
