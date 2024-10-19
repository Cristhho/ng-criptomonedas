import { TestBed } from "@angular/core/testing";
import { provideHttpClient } from "@angular/common/http";
import {
  HttpTestingController,
  provideHttpClientTesting,
} from "@angular/common/http/testing";
import { firstValueFrom } from "rxjs";

import { CriptomonedasService } from "./criptomonedas.service";
import { MapeoCrypto } from "../mappers";
import { CryptoResponse } from "@domain";
import { cryptoDto } from "../../../test/datos-simulados";

describe("CriptomonedasService", () => {
  let service: CriptomonedasService;
  let httpController: HttpTestingController;
  let mapeo: jasmine.SpyObj<MapeoCrypto>;

  beforeEach(() => {
    const mapeoSpy = jasmine.createSpyObj("MapeoCrypto", ["dtoModelo"]);
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: MapeoCrypto, useValue: mapeoSpy },
      ],
    });
    service = TestBed.inject(CriptomonedasService);
    httpController = TestBed.inject(HttpTestingController);
    mapeo = TestBed.inject(MapeoCrypto) as jasmine.SpyObj<MapeoCrypto>;
  });

  afterEach(() => {
    httpController.verify();
  });

  it("debe realizar la peticion", async () => {
    const observable$ = service.obtenerTodo();
    const promesa = firstValueFrom(observable$);

    const req = httpController.expectOne(
      "https://api.coingecko.com/api/v3/coins/list",
    );
    expect(req.request.method).toBe("GET");
    req.flush([]);
    expect(await promesa).toEqual([]);
  });

  it("debe obtener la respuesta y mapear los resultados", () => {
    const respuestaFalsa: CryptoResponse = [cryptoDto];
    const observable$ = service.obtenerTodo();
    firstValueFrom(observable$);

    const req = httpController.expectOne(
      "https://api.coingecko.com/api/v3/coins/list",
    );
    req.flush(respuestaFalsa);
    expect(mapeo.dtoModelo).toHaveBeenCalledWith(cryptoDto);
    expect(mapeo.dtoModelo).toHaveBeenCalledTimes(respuestaFalsa.length);
  });
});
