import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class HighlightPipe implements PipeTransform {
  transform(value: string = '', strToHighlight: string) {
    // throw new Error("Method not implemented.");
    const index = value.toLowerCase().indexOf(strToHighlight.toLowerCase());
    if (index !== -1) {
      return (
        value.substring(0, index) +
        '<b>' +
        value.substring(index, index + strToHighlight.length) +
        '</b>' +
        value.substring(index + strToHighlight.length)
      );
    }

    return value;
  }
}
