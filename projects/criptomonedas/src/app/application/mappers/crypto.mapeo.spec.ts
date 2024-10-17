import { crypto, cryptoDto } from "../../../test/datos-simulados";
import { MapeoCrypto } from "./crypto.mapeo";

describe('Mapeo de criptomonedas', () => {
  let mapeo: MapeoCrypto;

  beforeEach(() => {
    mapeo = new MapeoCrypto();
  });

  it('debe crear la instancia', () => {
    expect(mapeo).toBeTruthy();
  });

  it('debe llamar al metodo dtoModelo', () => {
    const spy = spyOn(mapeo, 'dtoModelo');
    mapeo.dtoModelo(cryptoDto);
    expect(spy).toHaveBeenCalled();
  });

  it('debe retornar un modelo de criptomoneda', () => {
    const _crypto = mapeo.dtoModelo(cryptoDto);
    expect(_crypto.id).toEqual(crypto.id);
  });

  it('debe retornar un dto de criptomoneda', () => {
    const _crypto = mapeo.modeloDto(crypto);
    expect(_crypto).toEqual(cryptoDto);
  });
});
