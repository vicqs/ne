import { Component, Input, OnInit } from '@angular/core';

import { Patient } from '../../../models';

@Component({
  moduleId: module.id,
  selector: 'ne-patient-button',
   templateUrl: './patient-button.component.html',
  styleUrls: ['./patient-button.component.css'],
})
export class patientButtonComponent implements OnInit {
  @Input() patient: Patient;

  constructor() {}

  ngOnInit() {
  }

}
