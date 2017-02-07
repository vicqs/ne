import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';

import { Patient, PatientService } from '../../models';
import { CanComponentDeactivate, EntityService, ModalService, ToastService } from '../../core';

@Component({
  moduleId: module.id,
  selector: 'ne-patient',
   templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.css']
})
export class PatientComponent implements OnDestroy, OnInit, CanComponentDeactivate {
  @Input() patient: Patient;
  editpatient: Patient = <Patient>{};

  private dbResetSubscription: Subscription;
  private id: any;

  constructor(
    private entityService: EntityService,
    private modalService: ModalService,
    private route: ActivatedRoute,
    private router: Router,
    private patientService: PatientService,
    private toastService: ToastService) { }

  cancel(showToast = true) {
    this.editpatient = this.entityService.clone(this.patient);
    if (showToast) {
      this.toastService.activate(`Cancelled changes to ${this.patient.name}`);
    }
  }

  canDeactivate() {
    return !this.patient ||
      !this.isDirty() ||
      this.modalService.activate();
  }

  delete() {
    let msg = `Do you want to delete ${this.patient.name}?`;
    this.modalService.activate(msg).then(responseOK => {
      if (responseOK) {
        this.cancel(false);
        this.patientService.deletepatient(this.patient)
          .subscribe(() => {
            this.toastService.activate(`Deleted ${this.patient.name}`);
            this.gotoPatients();
          },
          (err) => this.handleServiceError('Delete', err), // Failure path
          () => console.log('Delete Completed') // Completed actions
          );
      }
    });
  }

  isAddMode() {
    return isNaN(this.id);
  }

  ngOnDestroy() {
    this.dbResetSubscription.unsubscribe();
  }

  ngOnInit() {
    componentHandler.upgradeDom();
    this.dbResetSubscription = this.patientService.onDbReset
      .subscribe(() => this.getpatient());

    // Could use a snapshot here, as long as the parameters do not change.
    // This may happen when a component is re-used.
    // this.id = +this.route.snapshot.params['id'];
    this.route
      .params
      .map(params => params['id'])
      .do(id => this.id = +id)
      .subscribe(id => this.getpatient());
  }

  save() {
    let patient = this.patient = this.entityService.merge(this.patient, this.editpatient);
    if (patient.id == null) {
      this.patientService.addpatient(patient)
        .subscribe(s => {
          this.setEditpatient(s);
          this.toastService.activate(`Successfully added ${s.name}`);
          this.gotoPatients();
        });
      return;
    }
    this.patientService.updatepatient(patient)
      .subscribe(() => this.toastService.activate(`Successfully saved ${patient.name}`));
  }

  private getpatient() {
    if (this.id === 0) { return; };
    if (this.isAddMode()) {
      this.patient = <Patient>{ name: '', side: '' };
      this.editpatient = this.entityService.clone(this.patient);
      return;
    }
    this.patientService.getpatient(this.id)
      .subscribe(patient => this.setEditpatient(patient));
  }

  private gotoPatients() {
    this.router.navigate(['/patients']);
  }

  private handleServiceError(op: string, err: any) {
    console.error(`${op} error: ${err.message || err}`);
  }

  private isDirty() {
    return this.entityService.propertiesDiffer(this.patient, this.editpatient);
  }

  private setEditpatient(patient: Patient) {
    if (patient) {
      this.patient = patient;
      this.editpatient = this.entityService.clone(this.patient);
    } else {
      this.gotoPatients();
    }
  }
}
