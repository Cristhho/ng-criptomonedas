import { Injectable } from "@angular/core";

import { Crypto, Mapeo, CryptoResponseDTO, Estado } from "@domain";

@Injectable({
  providedIn: 'root'
})
export class MapeoCrypto implements Mapeo<Crypto, CryptoResponseDTO> {
  dtoModelo(datos: CryptoResponseDTO): Crypto {
    return {
      descripcion: "",
      estado: Estado.ACTIVO,
      id: datos.id,
      nombre: datos.name,
      signo: datos.symbol,
    };
  }

  modeloDto(modelo: Partial<Crypto>): CryptoResponseDTO;
  modeloDto(modelo: Crypto): CryptoResponseDTO {
    return {
      id: modelo.id as string,
      name: modelo.nombre,
      symbol: modelo.signo
    };
  }
}
