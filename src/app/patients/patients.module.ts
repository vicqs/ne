import { NgModule } from '@angular/core';

import { patientButtonComponent } from './shared/patient-button/patient-button.component';
import { SortPatientsPipe } from './shared/sort-patients.pipe';
import { PatientsRoutingModule, routedComponents } from './patients-routing.module';
import { SharedModule } from '../shared/shared.module';

import { MdGridListModule } from '@angular2-material/grid-list';
import { MdCoreModule } from '@angular2-material/core';

@NgModule({
  imports: [PatientsRoutingModule, SharedModule, MdCoreModule, MdGridListModule],
  declarations: [patientButtonComponent, SortPatientsPipe, routedComponents]
})
export class PatientsModule { }
