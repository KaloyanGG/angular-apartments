import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shorten'
})
export class ShortenPipe implements PipeTransform {

  transform(value: string | undefined, maxCount = 10): unknown {
    
    if (!value) {
      return '';
    }
    return `${value.substring(0,maxCount)}${value.length > maxCount ? '...' : ''}`;
  }

}
