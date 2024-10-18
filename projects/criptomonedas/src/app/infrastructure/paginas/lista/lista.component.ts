import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';

import { Crypto } from '@domain';
import { StorageService } from '../../../application/services';
import { ProgressBarComponent } from '@ui-lib';
import { BtnEliminarComponent } from '../../ui';

@Component({
  selector: 'cry-lista',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    ProgressBarComponent,
    BtnEliminarComponent,
  ],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaComponent implements OnInit {
  @ViewChild(MatPaginator) paginador!: MatPaginator;

  public readonly storageService = inject(StorageService);
  public dataSource = new MatTableDataSource<Crypto>([]);

  public columnas: string[] = ["id", "nombre", "descripcion", "acciones"];

  constructor() {
    effect(() => {
      this.dataSource.data = this.storageService.criptosSignal();
      this.dataSource.paginator = this.paginador;
    });
  }

  ngOnInit(): void {
    this.storageService.obtenerCriptos();
  }
}

