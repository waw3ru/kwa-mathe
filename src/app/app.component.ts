import type { OnInit } from '@angular/core';
import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { DbService } from './services';

@Component({
  selector: 'mathe-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <h1>Welcome to {{ title }}!</h1>

    <router-outlet />
  `,
})
export class AppComponent implements OnInit {
  readonly #srvDb = inject(DbService);

  title = 'kwa-mathe';

  public ngOnInit() {
    this.#srvDb.initDb();
  }
}
