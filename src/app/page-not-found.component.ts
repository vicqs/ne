import { Component } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'ne-404',
  template: `
    <article class="template animated slideInRight">
      <h4>Inconcebible!</h4>
      <div>No creo que esta página es lo que crees que es.</div>
    </article>
  `
})
export class PageNotFoundComponent { }
