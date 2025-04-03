import { Pipe, PipeTransform } from '@angular/core';
import { ProfileLocationModel } from '../models/profile/profile-models';

@Pipe({
  name: 'address'
})
export class AddressPipe implements PipeTransform {

  transform(value: ProfileLocationModel | null, includeStateAndCountry: boolean = false): string {
    let address = 'No data';
    if(!value){
      return address;
    }

    let line1And2 = value.line2 ? `${value.line1}, ${value.line2}` : value.line1;
    address = `${line1And2}, ${value.city}. (${value.postalCode}).`
    return includeStateAndCountry ? address + ` ${value.state}. ${value.country}.` : address;
  }

}
