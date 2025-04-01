import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'imageUrl'
})
export class ImageUrlPipe implements PipeTransform {

  transform(value: string | null): unknown {
    let placeholder = 'https://th.bing.com/th/id/OIP.qWxWnrBHWhc8nexK2HjpdwAAAA?pid=ImgDet&rs=1'
    return value ? value : placeholder;
  }

}
