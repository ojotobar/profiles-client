import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecased'
})
export class TitlecasedPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {
    return value.charAt(0).toUpperCase() + value.toLocaleLowerCase().slice(1);
  }

}
