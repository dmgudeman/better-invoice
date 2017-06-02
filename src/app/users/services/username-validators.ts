import { FormControl }from '@angular/forms';

export class UsernameValidators {
    static cannotContainSpace( formControl: FormControl ) {
        if (formControl.value.indexOf(' ') >= 0) {
            return {cannotContainSpace: true}
        }
        return null;
    }
}