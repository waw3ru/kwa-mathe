import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { DbOp } from '../../db/messages';
import { DbService } from '../../services';

@Component({
  selector: 'mathe-welcome',
  standalone: true,
  imports: [],
  templateUrl: './welcome.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WelcomeComponent implements OnInit {
  readonly #srvDb = inject(DbService);

  public ngOnInit() {
    this.#srvDb.dbChannel.postMessage({
      message: DbOp.QUERY_PERSON,
      data: 'employee',
    });

    this.#srvDb.dbChannel.onmessage = ({ data }) => {
      console.log(data);
    };
  }
}
