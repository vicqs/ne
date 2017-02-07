import { Pipe, PipeTransform } from '@angular/core';

import { Patient } from '../../models';

@Pipe({ name: 'sortPatients' })
export class SortPatientsPipe implements PipeTransform {
  transform(value: Patient[], args?: any[]) {
    if (!value || !value.sort) { return value; }

    return value.sort((a: Patient, b: Patient) => {
      if (a.name < b.name) { return -1; }
      if (a.name > b.name) { return 1; }
      return 0;
    });
  }
}
