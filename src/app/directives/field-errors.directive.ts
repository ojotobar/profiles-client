import { Directive, ElementRef, inject } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';

@Directive({
  selector: '[appFieldErrors]'
})
export class FieldErrorsDirective {
  form = inject(MatFormField);
  errorElement = inject(ElementRef)

  ngAfterViewInit(){
    const control = this.form._formFieldControl.ngControl?.control;
    if(!control){
      throw new Error('FieldErrorsDirective must be used within a mat form field with a form control');
    }

    control.events.subscribe(() => {
      const showError = control.errors && (control.dirty || control.touched);
      if(showError){
        const firstError = Object.keys(control.errors)[0];
        const firstErrorValue = control.errors[firstError];
        const message = this.getErrorMessage(firstError, firstErrorValue);
        this.errorElement.nativeElement.textContent = message
      } else {
        this.errorElement.nativeElement.textContent = '';
      }
    })
  }

  getErrorMessage(error: string, firstErrorValue: any): string {
    const errorMessages: { 
      [key: string]: string | ((errorValue: any) => string);
    } = {
      required: 'This field is required',
      minLength: (errorValue) => `Must be at least ${errorValue.requiredLength} charaters`,
      maxLength: (errorValue) => `Must be less than ${errorValue.requiredLength} characters`,
      min: (errorValue) => `Must be at least ${errorValue.min}`,
      max: (errorValue) => `Must be less than ${errorValue.max}`,
      email: 'Please enter a valid email address',
      phoneNumber: 'Please enter a valid phone number',
      postalCode: 'Please enter a valid postal code'
    }

    const errorMessage = errorMessages[error];
    if(typeof errorMessage === 'function'){
      return errorMessage(firstErrorValue)
    }
    return errorMessage || '';
  }
}
