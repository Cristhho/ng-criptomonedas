import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaComponent { }

