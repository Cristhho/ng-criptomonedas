import { Injectable } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";

import { CriptoForm } from "../../domain";
import { Crypto, Estado } from "@domain";

@Injectable({
  providedIn: "root",
})
export class FormularioService {
  private _formulario!: FormGroup<CriptoForm>;

  get formulario() {
    return this._formulario;
  }

  constructor(private readonly fb: FormBuilder) {}

  public construirFormulario() {
    this._formulario = this.fb.nonNullable.group({
      descripcion: new FormControl("", {
        validators: [Validators.maxLength(200), Validators.required],
      }),
      estado: new FormControl<Estado>(Estado.ACTIVO, {
        validators: [Validators.required],
      }),
      id: new FormControl("", {
        validators: [Validators.required, Validators.minLength(3)],
      }),
      nombre: new FormControl("", {
        validators: [Validators.required, Validators.maxLength(50)],
      }),
      signo: new FormControl("", {
        validators: [Validators.required, Validators.minLength(3)],
      }),
    });
  }

  public crearModelo(): Crypto {
    return {
      ...this._formulario.value,
      id: this._formulario.get("id")?.value,
    } as Crypto;
  }
}
