import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'valueornull'
})
export class ValueornullPipe implements PipeTransform {
  transform(value: string | null, placeholder: string = 'N/A'): string {
    return value ? value : placeholder;
  }
}
