import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientComponent } from './patient/patient.component';
import { PatientsComponent } from './patients.component';
import { CanDeactivateGuard } from '../core';

const routes: Routes = [
  {
    path: '',
    component: PatientsComponent,
    children: [
      {
        path: '',
        component: PatientListComponent,
      },
      {
        path: ':id',
        component: PatientComponent,
        canDeactivate: [CanDeactivateGuard]
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule { }

export const routedComponents = [PatientsComponent, PatientListComponent, PatientComponent];
