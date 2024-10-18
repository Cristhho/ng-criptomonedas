import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Crypto } from '@domain';

@Component({
  selector: 'cry-btn-eliminar',
  standalone: true,
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,
  ],
  templateUrl: './btn-eliminar.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BtnEliminarComponent {
  @Input()
  id: Crypto["id"] = "";
}

