import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'arrayToColumn'
})
export class ArrayToColumnPipe implements PipeTransform {

  transform(value: string[]): string {
    if (Array.isArray(value)) {
      return value.join('  ');
    }
    return '';
  }

}
