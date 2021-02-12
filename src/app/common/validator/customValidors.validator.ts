import { DatePipe } from '@angular/common';
import { AbstractControl, ValidationErrors } from '@angular/forms';

export class CustomValidators {

   static greaterThenZero(control: AbstractControl): ValidationErrors | null {
        if ((control.value as number) <= 0)
            return { greaterThenZero: true };
        return null;
    }

    static nonNegative(control: AbstractControl): ValidationErrors | null {
        if ((control.value as number) < 0)
            return { greaterThenZero: true };
        return null;
    }

    static futureDate(control: AbstractControl): ValidationErrors | null {
        
        if(control.value){
                        
            let value =Date.parse(control.value);
            let today = Date.parse(new Date().toDateString())            
            if (value<=today)
            return { futureDate: true };
        }
        return null;
    }
    

}