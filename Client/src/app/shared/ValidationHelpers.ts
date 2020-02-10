import { ValidatorFn, ValidationErrors, AbstractControl, AsyncValidatorFn } from '@angular/forms';
import { map, filter, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

function isObservable(observerable: ValidationErrors | Observable<ValidationErrors>): observerable is Observable<ValidationErrors> {
  return observerable.pipe && typeof observerable.pipe === 'function';
}

export class ValidationHelpers {
  // Validator that wraps another validator and adds a message property to the ValidationErrors payload
  static addMessage(innerValidator: ValidatorFn, message: string | ((validationErrors: ValidationErrors) => string)): ValidatorFn {
    return (control: AbstractControl) => {
      const result = innerValidator(control);
      if (result) {
        if (typeof message !== 'string') {
          const func = message as ((validationErrors: ValidationErrors) => string);
          message = func(result);
        }
        const newObj: ValidationErrors = Object.assign({}, ...Object.keys(result)
          .filter((k) => result[k])
          .map(k => ({ [k]: { ...result[k], message } })));
        return newObj;
      }
      return null;
    };
  }

  static asyncAddMessage(innerValidator: AsyncValidatorFn, message: string | ((validationErrors: ValidationErrors) => string)): AsyncValidatorFn {
    return async (control: AbstractControl) => {
      const innerResult = await innerValidator(control);
      if (innerResult) {
        const getMessage = (errors: ValidationErrors): string => {
          if (typeof message !== 'string') {
            const func = message as ((validationErrors: ValidationErrors) => string);
            return func(errors);
          } else {
            return message;
          }
        };

        const result = (errors: ValidationErrors): ValidationErrors => {
          return Object.assign({}, ...Object.keys(errors)
            .filter(x => errors[x])
            .map(x => ({ [x]: { ...errors[x], message: getMessage(errors), value: control.value } })));
        };
        if (isObservable(innerResult)) {
          return innerResult.pipe(
            filter(x => Boolean(x)),
            map(x => result(x)),
            take(1)).toPromise();
        } else {
          return result(innerResult);
        }
      }
      return null;
    };
  }
}
