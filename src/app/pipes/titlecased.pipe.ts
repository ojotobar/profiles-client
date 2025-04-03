import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titlecased'
})
export class TitlecasedPipe implements PipeTransform {

  transform(value: string, splitter: string = ''): string {
    if(splitter){
      var splits = value.split(splitter);
      if(splits.length > 0){
        let result = ''
        for (let index = 0; index < splits.length; index++) {
          const element = splits[index];
          result += (element.charAt(0).toUpperCase() + element.toLocaleLowerCase().slice(1) + ' ')
        }

        return result.trim();
      } else {
        return ''
      }
    } else {
      return value.charAt(0).toUpperCase() + value.toLocaleLowerCase().slice(1);
    }
  }

}
