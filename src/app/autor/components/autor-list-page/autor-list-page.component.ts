import { AutorInterface } from './../../types/autor.interface';
import { Observable } from 'rxjs';
import { AutorService } from './../../services/autor.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-autor-list-page',
  templateUrl: './autor-list-page.component.html',
})
export class AutorListPageComponent {
  autores$: Observable<AutorInterface[]> = this.autorService.getAutores();

  constructor(private autorService: AutorService) {}
}
