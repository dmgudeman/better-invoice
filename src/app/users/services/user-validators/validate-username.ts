import { FormControl } from '@angular/forms';

export function validateUsername(c: FormControl) {
  let USERNAME_REGEXP = /^\S*$/; // a string consisting only of non-whitespaces
  console.log(`Im here in validateUsername ${USERNAME_REGEXP.test(c.value)}`);
  console.log(c);
  console.log(c.value);

  return USERNAME_REGEXP.test(c.value) ? null : {
    validateUsername: {
      valid: false
    }
  };
}

// https://blog.thoughtram.io/angular/2016/03/14/custom-validators-in-angular-2.html
// https://stackoverflow.com/questions/16334765/regular-expression-for-not-allowing-spaces-in-the-input-field