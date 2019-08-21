import { Pipe, PipeTransform } from '@angular/core';
import { Platform } from '@ionic/angular';

@Pipe({
  name: 'shortTitle'
})
export class ShortTitlePipe implements PipeTransform {

  constructor(private platform: Platform) {}

  transform(value: any): any {
    if (this.platform.width() < 768) {
      let returnValue = value.replace(/Showing/g, 'S');
      returnValue = returnValue.replace(/Time/g, 'T');
      returnValue = returnValue.replace(/Appointment/g, 'Appt');
      returnValue = returnValue.replace(/Center/g, 'Center');
      return returnValue;
    } else {
      return value;
    }
  }

}
