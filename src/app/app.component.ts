import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Crypto, Estado } from '@domain';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'crypto-tracking';
  private crypto: Crypto = {
    descripcion: "",
    estado: Estado.ACTIVO,
    id: "bit",
    nombre: "bitcoin",
    signo: "bit"
  };

  get cryptoJson() {
    return JSON.stringify(this.crypto);
  }
}
