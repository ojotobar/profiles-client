import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate'
})
export class CustomDatePipe implements PipeTransform {
  min: Date = new Date('0001-01-01T00:00:00.000Z');
  max: Date = new Date('9999-12-31T23:59:59.999Z');

  transform(value: Date, defaultValue: string = 'Never'): string {
    const date = new Date(value);
    if(date.getTime() === this.min.getTime() || date.getTime() === this.max.getTime()){
      return defaultValue;
    } else{
      return date.toLocaleString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    }
  }

}
