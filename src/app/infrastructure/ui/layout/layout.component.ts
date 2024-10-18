import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CabeceraComponent } from '../cabecera/cabecera.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ProgressBarComponent } from '@ui-lib';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [RouterOutlet, CabeceraComponent, ProgressBarComponent],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css',
})
export class LayoutComponent { }

