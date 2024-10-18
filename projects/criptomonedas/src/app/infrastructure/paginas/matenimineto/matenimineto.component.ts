import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component } from "@angular/core";
import {MatCardModule} from "@angular/material/card";

import { FormularioService } from "../../../application/services/formulario.service";
import { BtnGuardarComponent, FormCriptoComponent } from "../../ui";

@Component({
  selector: "cry-matenimineto",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormCriptoComponent,
    BtnGuardarComponent
  ],
  templateUrl: "./matenimineto.component.html",
  styleUrl: "./matenimineto.component.css",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MateniminetoComponent {
  constructor(
    private readonly formularioService: FormularioService
  ) {
    this.formularioService.construirFormulario();
  }
}

