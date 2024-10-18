import { Crypto } from "../crypto";

export interface SesionAdapter {
  obtenerCriptos(): void;
  guardarCriptos(criptos: Array<Crypto>): void;
  obtenerPorId(id: Crypto["id"]): Crypto;
  eliminarCripto(id: Crypto["id"]): void;
  agregar(cripto: Crypto): void;
  actualizar(id: Crypto["id"], cripto: Omit<Crypto, "id">): void;
}
