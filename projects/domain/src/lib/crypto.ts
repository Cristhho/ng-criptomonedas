import { Estado, ModeloBase } from "./modelo-base";

export type Crypto = ModeloBase & {
  signo: string;
  nombre: string;
  estado: Estado;
  descripcion: string;
};
