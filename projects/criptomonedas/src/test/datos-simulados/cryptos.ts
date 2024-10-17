import { Crypto, CryptoResponseDTO, Estado } from "@domain";

export const crypto: Crypto = {
  descripcion: "descripcion crypto",
  estado: Estado.ACTIVO,
  id: "bitcoin",
  nombre: "Bitcoin",
  signo: "btc"
};

export const cryptoDto: CryptoResponseDTO = {
  id: "bitcoin",
  name: "Bitcoin",
  symbol: "btc"
};
