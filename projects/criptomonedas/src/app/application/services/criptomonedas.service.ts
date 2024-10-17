import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

import { Crypto, RepositorioBase, CryptoResponse } from '@domain';
import { MapeoCrypto } from '../mappers';

@Injectable({
  providedIn: 'root'
})
export class CriptomonedasService implements RepositorioBase<Crypto> {
  private readonly url = "https://api.coingecko.com/api/v3/coins/list";
  private readonly mapeo = inject(MapeoCrypto);
  private readonly http = inject(HttpClient);

  obtenerTodo(): Observable<Crypto[]> {
    return this.http.get<CryptoResponse>(this.url).pipe(
      map((respuesta) => respuesta.map((c) => this.mapeo.dtoModelo(c)))
    );
  }

}
