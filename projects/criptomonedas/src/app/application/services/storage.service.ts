import { inject, Injectable, signal } from '@angular/core';

import { CriptomonedasService } from './criptomonedas.service';
import { Crypto, SesionAdapter } from '@domain';
import { finalize } from 'rxjs';
import { ToastService } from '@ui-lib';

@Injectable({
  providedIn: 'root'
})
export class StorageService implements SesionAdapter {
  private readonly storageKey = "CRYPTOS";
  private readonly servicioCripto = inject(CriptomonedasService);
  private readonly toastService = inject(ToastService);
  public criptosSignal = signal<Array<Crypto>>([]);
  public cargando = signal(false);

  public obtenerCriptos() {
    this.cargando.set(true);
    const criptosEnSession = this.cargarDesdeSesion();
    if (criptosEnSession === null) {
      this.servicioCripto.obtenerTodo().pipe(
        finalize(() => this.cargando.set(false))
      ).subscribe({
        next: (criptos) => {
          this.guardarCriptos(criptos);
          this.toastService.add({
            message: "Criptomonedas guardadas en sesion",
            type: "success",
            duration: 3000,
          });
        },
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

  agregar(cripto: Crypto) {
    const criptosEnSession = this.cargarDesdeSesion();
    const jsonCryptos = JSON.parse(criptosEnSession!) as Array<Crypto>;
    jsonCryptos.unshift(cripto);
    this.guardarCriptos(jsonCryptos);
    this.toastService.add({
      message: "Se guardo correctamente.",
      type: "success",
      duration: 3000,
    });
  }

  private cargarDesdeSesion() {
    return window.sessionStorage.getItem(this.storageKey);
  }
}
