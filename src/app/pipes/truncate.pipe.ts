import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {

  transform(value: string, limit: number = 100, completeWords: boolean = false, ellipsis: string = '...'): string {
    if(!value){
      return '';
    }

    if(value.length <= limit){
      return value;
    }

    if(completeWords){
      let lastSpaceIndex = value.lastIndexOf(' ', limit);
      return value.substring(0, lastSpaceIndex) + ellipsis;
    }

    return value.substring(0, limit) + ellipsis;
  }

}
