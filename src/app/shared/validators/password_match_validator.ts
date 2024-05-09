import { AbstractControl } from "@angular/forms";

export const PasswordsMatchValidator = (passwordControlName: string, confirmPasswordControlName: string) => {
    const validato = (from: AbstractControl) => {
        const passwordControl = from.get(passwordControlName);
        const confiPasswordControl = from.get(confirmPasswordControlName);

        if(!passwordControl || !confiPasswordControl) return

        if(passwordControl.value !== confiPasswordControl.value){
            confiPasswordControl.setErrors({notMatch: true});
        }else{
            const errors = confiPasswordControl.errors;
            if(!errors) return;

            delete errors.notMatch;
            confiPasswordControl.setErrors(errors);
        }
    }
    return validato;
}