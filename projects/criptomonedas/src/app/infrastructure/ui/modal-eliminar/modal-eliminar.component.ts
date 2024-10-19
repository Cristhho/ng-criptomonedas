import { CommonModule } from "@angular/common";
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Inject,
} from "@angular/core";
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
  MatDialogActions,
  MatDialogClose,
  MatDialogRef,
} from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";

import { ID } from "@domain";
import { StorageService } from "../../../application/services";

type ModalData = {
  id: ID;
};

@Component({
  selector: "cry-modal-eliminar",
  standalone: true,
  imports: [
    CommonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
  templateUrl: "./modal-eliminar.component.html",
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ModalEliminarComponent {
  private readonly storageService = inject(StorageService);

  constructor(
    private readonly dialogRef: MatDialogRef<ModalEliminarComponent>,
    @Inject(MAT_DIALOG_DATA) public data: ModalData,
  ) {}

  eliminar() {
    this.storageService.eliminarCripto(this.data.id);
    this.dialogRef.close();
  }
}
