import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-matenimineto',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './matenimineto.component.html',
  styleUrl: './matenimineto.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MateniminetoComponent { }

