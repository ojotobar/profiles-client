import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'initials'
})
export class InitialsPipe implements PipeTransform {

  transform(value: string, first: string = '', last: string = ''): string {
    if(first && last){
      return `${first} ${this.middleInitial(value)} ${last}`;
    } else if(!first && last){
      return `${last} ${this.middleInitial(value)}`;
    } else if(!last && first){
      return `${first} ${this.middleInitial(value)}`
    } else {
      return this.middleInitial(value);
    }
  }

  middleInitial(value: string): string {
    return value ? value.substring(0, 1).toUpperCase() + '.' : ''
  }
}
