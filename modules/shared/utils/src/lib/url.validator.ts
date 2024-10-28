import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function urlValidator(): ValidatorFn {
    const urlPattern = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/;

    return (control: AbstractControl): ValidationErrors | null => {
        const isValid = urlPattern.test(control.value);
        return isValid ? null : { invalidUrl: true };
    };
}
