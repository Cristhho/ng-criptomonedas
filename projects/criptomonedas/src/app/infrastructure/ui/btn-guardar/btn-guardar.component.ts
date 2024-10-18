import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { FormularioService } from '../../../application/services/formulario.service';
import { StorageService } from '../../../application/services';

@Component({
  selector: 'cry-btn-guardar',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
  ],
  templateUrl: './btn-guardar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnGuardarComponent {
  @Input({ required: false })
  editando = false;

  private readonly formularioService = inject(FormularioService);
  private readonly storageService = inject(StorageService);

  public reiniciarFormulario() {
    this.formularioService.formulario.reset();
  }

  public guardar() {
    if (this.formularioService.formulario.invalid) {
      this.formularioService.formulario.markAllAsTouched();
      return;
    }

    this.storageService.agregar(this.formularioService.crearModelo());
    this.reiniciarFormulario();
  }
}

