import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncate'
})
export class TruncatePipe implements PipeTransform {
  newString: string = '';
  transform(description: string, descLength: number): string {
    if (description.length > descLength) {
      this.newString = description.slice(0, descLength) + "...";
      return this.newString;
    }
    return description;
  }

}
