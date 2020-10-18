import { Pipe, PipeTransform } from '@angular/core';
@Pipe({name: 'formatMomentDate'})
export class FormatMomentDatePipe implements PipeTransform {
  transform(value: any, format: string): string {
    if( value ) return value.format(format);
	return "";
  }
}