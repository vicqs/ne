import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Patient } from './patient.model';
import { CONFIG, ExceptionService, MessageService, SpinnerService } from '../core';

let patientsUrl = CONFIG.baseUrls.patients;

@Injectable()
export class PatientService {
  onDbReset = this.messageService.state;

  constructor(private http: Http,
    private exceptionService: ExceptionService,
    private messageService: MessageService,
    private spinnerService: SpinnerService) {
    this.messageService.state.subscribe(state => this.getPatients());
  }

  addpatient(patient: Patient) {
    let body = JSON.stringify(patient);
    this.spinnerService.show();
    return <Observable<Patient>>this.http
      .post(`${patientsUrl}`, body)
      .map(res => res.json().data)
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  deletepatient(patient: Patient) {
    this.spinnerService.show();
    return <Observable<Patient>>this.http
      .delete(`${patientsUrl}/${patient.id}`)
      .map(res => this.extractData<Patient>(res))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  getPatients() {
    this.spinnerService.show();
    return <Observable<Patient[]>>this.http
      .get(patientsUrl)
      .map(res => this.extractData<Patient[]>(res))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  getpatient(id: number) {
    this.spinnerService.show();
    return <Observable<Patient>>this.http
      .get(`${patientsUrl}/${id}`)
      .map(res => this.extractData<Patient>(res))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  updatepatient(patient: Patient) {
    let body = JSON.stringify(patient);
    this.spinnerService.show();

    return <Observable<Patient>>this.http
      .put(`${patientsUrl}/${patient.id}`, body)
      .map(res => this.extractData<Patient>(res))
      .catch(this.exceptionService.catchBadResponse)
      .finally(() => this.spinnerService.hide());
  }

  private extractData<T>(res: Response) {
    if (res.status < 200 || res.status >= 300) {
      throw new Error('Bad response status: ' + res.status);
    }
    let body = res.json ? res.json() : null;
    return <T>(body && body.data || {});
  }
}
