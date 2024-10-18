import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, Input, OnInit, signal } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { BtnGuardarComponent, FormCriptoComponent } from "../../ui";
import { FormularioService } from "../../../application/services/formulario.service";
import { StorageService } from "../../../application/services";

@Component({
  selector: "cry-editar",
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    FormCriptoComponent,
    BtnGuardarComponent
  ],
  templateUrl: "./editar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditarComponent implements OnInit {
  @Input({required: true})
  set id(cripto: string) {
    this.cripto.set(cripto);
  }

  public cripto = signal("");

  constructor(
    private readonly formularioService: FormularioService,
    private readonly storageService: StorageService
  ) {
    this.formularioService.construirFormulario();
  }

  ngOnInit(): void {
    const cripto = this.storageService.obtenerPorId(this.cripto());
    this.formularioService.formulario.patchValue(cripto);
  }
}

