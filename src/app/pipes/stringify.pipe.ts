import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringify'
})
export class StringifyPipe implements PipeTransform {
  transform(value: string[] | null, separator: string = ' '): string {
    if(!value) return '';
    return value.join(separator);
  }
}
