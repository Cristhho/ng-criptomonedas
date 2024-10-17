import { Observable } from 'rxjs';

import { ModeloBase } from '../modelo-base';

export interface RepositorioBase<T extends ModeloBase> {
  obtenerTodo(): Observable<Array<T>>;
}
