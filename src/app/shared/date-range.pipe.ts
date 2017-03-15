import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'dateRange'
})
export class DateRangePipe implements PipeTransform {

  transform(value, args ): any {
    let [beginDate, endDate ] = args;

    return value.filter(item => {
      return item.date <= beginDate && item.date >= endDate;
    }) ;
  }

}
