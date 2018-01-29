import { AbstractControl } from '@angular/Forms/src/model';
import { ValidationErrors } from '@angular/Forms/src/directives/validators';


export const ipPattern = '(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)';
export class CommonValidators {

       static invalidInterfaceName(control: AbstractControl) : ValidationErrors | null {
        if((control.value as string).toUpperCase() !== 'LOOPBACK100' &&
        (control.value as string).toUpperCase() !== 'LOOPBACK150' &&
        (control.value as string).toUpperCase() !== 'LOOPBACK200') {
            return {invalidInterfaceName: true};
        }
        return null;
    }
   }
