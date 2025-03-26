import {AbstractControl, ValidationErrors, ValidatorFn} from '@angular/forms';

export function passwordStrengthValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        const value = control.value;
        if(!value){
            return {passwordStrength:true};
        }

        const hasUpperCase = /[A-Z]+/.test(value);
        const hasLowerCase = /[a-z]+/.test(value);
        const hasNumber = /[0-9]+/.test(value);
        const hasSpecialChars = /[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/.test(value);
        const isValid = hasUpperCase && hasLowerCase && hasNumber && hasSpecialChars;

        return !isValid ? {passwordStrength:true} : null;
    }
}

export function matchingPasswordValidator(): ValidatorFn {
    return (control: AbstractControl) : ValidationErrors | null => {
        const password = control.get(['passwords']);
        const confirmPassword = control.get(['passwordTemp']);

        if (password === null || confirmPassword === null || password.value !== confirmPassword.value) {
        return { mismatchedPasswords: true };
        }
        return null;
    }
}