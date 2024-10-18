import { CommonModule } from "@angular/common";
import { ChangeDetectionStrategy, Component, inject, Input } from "@angular/core";
import { MatDialog } from "@angular/material/dialog";

import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { Crypto } from "@domain";
import { ModalEliminarComponent } from "../modal-eliminar/modal-eliminar.component";

@Component({
  selector: "cry-btn-eliminar",
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: "./btn-eliminar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnEliminarComponent {
  @Input()
  id: Crypto["id"] = "";

  private readonly dialog = inject(MatDialog);

  abrirModal() {
    this.dialog.open(ModalEliminarComponent, {
      data: {
        id: this.id
      },
    });
  }
}

