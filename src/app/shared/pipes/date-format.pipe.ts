import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateFormat'
})
export class DateFormattPipe implements PipeTransform {

  transform(value: string): string {
    const date = new Date(value).toLocaleDateString('en-gb');

    return date;
  }

}
