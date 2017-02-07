import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
   selector: 'body',
   templateUrl: './app.component.html',
   styleUrls: ['./app.component.css']
})
export class AppComponent { 
   pageTitle: string = "Admnistración de Paciente";
}
