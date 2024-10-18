import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Input, OnInit } from "@angular/core";
import { FormControl, ReactiveFormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatFormFieldModule } from "@angular/material/form-field";

import { FormularioService } from "../../../application/services/formulario.service";
import { FormInputErrorDirective, InputComponent, SelectEstadoComponent } from "@ui-lib";

@Component({
  selector: "cry-form-cripto",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    FormInputErrorDirective,
    InputComponent,
    SelectEstadoComponent
  ],
  templateUrl: "./form-cripto.component.html",
  styleUrl: "./form-cripto.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FormCriptoComponent implements OnInit {
  @Input({ required: false })
  editando = false;

  private readonly formularioService = inject(FormularioService);

  get formulario() {
    return this.formularioService.formulario;
  }

  get descFormControl() {
    return this.formulario.get("descripcion") as FormControl;
  }

  ngOnInit(): void {
    if (this.editando) this.formulario.get("id")?.disable();
    else this.formulario.get("id")?.enable();
  }
}
