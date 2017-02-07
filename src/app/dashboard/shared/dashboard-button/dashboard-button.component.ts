import { Component, Input, OnInit } from '@angular/core';

import { Patient } from '../../../models';

@Component({
  moduleId: module.id,
  selector: 'ne-dashboard-button',
   templateUrl: './dashboard-button.component.html',
  styleUrls: ['./dashboard-button.component.css']
})
export class DashboardButtonComponent implements OnInit {
  @Input() patient: Patient;

  constructor() {}

  ngOnInit() {
  }
}
