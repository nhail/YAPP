// Copyright © 2020 Wolters Kluwer Financial Services, Inc. All rights reserved.
import { Injectable } from '@angular/core';
import { ValidatorFn, AsyncValidatorFn } from '@angular/forms';

@Injectable()
export class FormBuilderHelper<TModel>
{
  // tslint:disable-next-line: no-any
  private state: { [key: string]: [any, ValidatorFn[], AsyncValidatorFn[]] } = {};

  // simple helper to get typesafety form building
  //  todo to add AsyncValdatorsFn and to add imbeded FormGroup, FormControl, FormArray
  public CreateControl<T extends TModel, K extends Extract<keyof T, string>>(name: K, defaultValue: T[K], validations?: ValidatorFn[] | ValidatorFn, asyncValidations?: AsyncValidatorFn[] | AsyncValidatorFn): FormBuilderHelper<TModel> {
    // tslint:disable-next-line: no-any
    const data: [any, ValidatorFn[], AsyncValidatorFn[]] = name in this.state ? this.state[name] : [, [], []];
    data[0] = defaultValue;
    if (validations) {
      if (validations instanceof Array) {
        for (const validation of validations) {
            data[1].push(validation);
        }
      } else {
        data[1].push(validations);
      }
    }
    if (asyncValidations) {
      if (asyncValidations instanceof Array) {
        for (const asyncValidation of asyncValidations) {
          data[2].push(asyncValidation);
        }
      } else {
        data[2].push(asyncValidations);
      }
    }
    this.state[name] = data;
    return this;
  }
  // tslint:disable-next-line: no-any
  public ToFormGroup(): { [key: string]: any } {
    return this.state;
  }
}


