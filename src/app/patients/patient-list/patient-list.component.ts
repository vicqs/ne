import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription } from 'rxjs/subscription';

import { Patient, PatientService } from '../../models';
import { FilterTextComponent } from '../../shared/filter-text/filter-text.component';
import { FilterTextService } from '../../shared/filter-text/filter-text.service';

@Component({
  moduleId: module.id,
  selector: 'ne-patient-list',
   templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css'],
})
export class PatientListComponent implements OnDestroy, OnInit {
  private dbResetSubscription: Subscription;

  patients: Patient[] = [];
  filteredPatients = this.patients;
  @ViewChild(FilterTextComponent) filterComponent: FilterTextComponent;

  constructor(private patientService: PatientService,
    private filterService: FilterTextService) { }

  filterChanged(searchText: string) {
    this.filteredPatients = this.filterService.filter(searchText, ['id', 'name', 'side'], this.patients);
  }

  getPatients() {
    this.patients = [];

    this.patientService.getPatients()
      .subscribe(patients => {
        this.patients = this.filteredPatients = patients;
        // this.filterComponent.clear();
      });
  }

  ngOnDestroy() {
    this.dbResetSubscription.unsubscribe();
  }

  ngOnInit() {
    componentHandler.upgradeDom();
    this.getPatients();
    this.dbResetSubscription = this.patientService.onDbReset
      .subscribe(() => this.getPatients());
  }

  trackByPatients(index: number, patient: Patient) {
    return patient.id;
  }
}
