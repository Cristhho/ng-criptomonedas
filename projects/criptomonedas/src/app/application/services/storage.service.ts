import { inject, Injectable, signal } from '@angular/core';

import { CriptomonedasService } from './criptomonedas.service';
import { Crypto, SesionAdapter } from '@domain';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements SesionAdapter {
  private readonly storageKey = "CRYPTOS";
  private readonly servicioCripto = inject(CriptomonedasService);
  public criptosSignal = signal<Array<Crypto>>([]);
  public cargando = signal(false);

  public obtenerCriptos() {
    this.cargando.set(true);
    const criptosEnSession = this.cargarDesdeSesion();
    if (criptosEnSession === null) {
      this.servicioCripto.obtenerTodo().subscribe({
        next: (criptos) => {
          this.guardarCriptos(criptos);
          this.cargando.set(false);
        }
      });
    } else {
      this.criptosSignal.set(JSON.parse(criptosEnSession) as Array<Crypto>);
      this.cargando.set(false);
    }
  }

  public guardarCriptos(criptos: Array<Crypto>) {
    window.sessionStorage.setItem(this.storageKey, JSON.stringify(criptos));
    this.criptosSignal.set(criptos);
  }

  public obtenerPorId(id: Crypto["id"]) {
    const criptosEnSession = this.cargarDesdeSesion();
    const jsonCryptos = JSON.parse(criptosEnSession!) as Array<Crypto>;
    return jsonCryptos.find((c) => c.id === id)!;
  }

  public eliminarCripto(id: Crypto["id"]) {
    const criptosEnSession = this.cargarDesdeSesion();
    const jsonCryptos = JSON.parse(criptosEnSession!) as Array<Crypto>;
    const nuevasCryptos = jsonCryptos.filter((c) => c.id !== id);
    this.guardarCriptos(nuevasCryptos);
  }

  private cargarDesdeSesion() {
    return window.sessionStorage.getItem(this.storageKey);
  }
}
