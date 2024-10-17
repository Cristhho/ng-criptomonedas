import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, effect, inject, Signal, ViewChild } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import {MatPaginator, MatPaginatorModule} from '@angular/material/paginator';
import { Observable } from 'rxjs';

import { Crypto } from '@domain';
import { CriptomonedasService } from '../../../application/services';

@Component({
  selector: 'cry-lista',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
  ],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListaComponent {
  @ViewChild(MatPaginator) paginador!: MatPaginator;

  private readonly servicioCripto = inject(CriptomonedasService);
  public criptos$!: Observable<Array<Crypto>>;
  public criptosSignal!: Signal<Crypto[]>;
  public dataSource = new MatTableDataSource<Crypto>([]);

  public columnas: string[] = ['id', 'nombre', 'descripcion'];

  constructor() {
    this.criptos$ = this.servicioCripto.obtenerTodo();
    this.criptosSignal = toSignal(this.criptos$, { initialValue: [] });
    effect(() => {
      this.dataSource.data = this.criptosSignal();
      this.dataSource.paginator = this.paginador;
    });
  }
}

