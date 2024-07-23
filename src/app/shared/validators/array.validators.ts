import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function emptyArrayValidator(): ValidatorFn  {
  return (control: AbstractControl): ValidationErrors | null => {
    const isValid = control.value && control.value.length > 0;
    return isValid ? null : { emptyArrayError: true };
  };
}
