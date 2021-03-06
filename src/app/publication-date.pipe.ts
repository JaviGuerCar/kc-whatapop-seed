import * as moment from 'moment';
import 'moment/locale/es';

import { Pipe, PipeTransform } from '@angular/core';
import { Product } from './product';


/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| Blue Path                                                        |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|
| Crea el pipe PublicationDatePipe. Su cometido es, partiendo de   |
| una fecha dada, retornar una cadena de texto que exprese el      |
| tiempo que ha pasado desde dicha fecha hasta ahora. Por ejemplo: |
| hace 2 horas. Para esta tarea nos apoyamos en la librería        |
| Moment.js; ya tienes hecho el import correspondiente, solo       |
| tienes que usarla donde proceda. Haciendo                        |
| 'moment(fecha).fromNow()' obtenemos justo lo que necesitamos.    |
|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/


// Implemento el PublicationDate Pipe.

@Pipe({
    name: 'publicationDate'
})
export class PublicationDatePipe implements PipeTransform {

    transform (fecha: any): any{
        //console.log(fecha);
        return moment(fecha).fromNow();
    }

}