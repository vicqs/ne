import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subscription } from 'rxjs/Subscription';

import { Patient, PatientService } from '../../app/models';
import { ToastService } from '../../app/core';

@Component({
  moduleId: module.id,
  selector: 'ne-dashboard',
   templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnDestroy, OnInit {
  private dbResetSubscription: Subscription;

  patients: Observable<Patient[]>;
  title: string;

  constructor(
    private route: ActivatedRoute,
    private patientService: PatientService,
    private router: Router,
    private toastService: ToastService) { }

  getPatients() {
    this.patients = this.patientService.getPatients()
      .do(() => this.toastService.activate('Obteniendo pacientes para el dashboard'))
      .catch(e => {
        this.toastService.activate(`${e}`);
        return Observable.of([]);
      });
  }

  gotoDetail(patient: Patient) {
    let link = ['/patients', patient.id];
    this.router.navigate(link);
  }

  ngOnDestroy() {
    this.dbResetSubscription.unsubscribe();
  }

  ngOnInit() {
    this.route.data.subscribe((data: { title: string }) => {
      this.title = data.title;
    });
    this.getPatients();
    this.dbResetSubscription = this.patientService.onDbReset
      .subscribe(() => this.getPatients());
  }

  trackByPatients(index: number, patient: Patient) {
    return patient.id;
  }
}
