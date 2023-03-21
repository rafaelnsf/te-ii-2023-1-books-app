import { environment } from 'src/environments/environment';
import { AutorInterface } from './../types/autor.interface';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AutorService {
  constructor(private httpClient: HttpClient) {}
  getAutores(): Observable<AutorInterface[]> {
    return this.httpClient.get<AutorInterface[]>(
      `${environment.apiUrl}/autores`
    );
  }
}
