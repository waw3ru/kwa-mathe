import {
  ChangeDetectionStrategy,
  Component,
  inject,
  OnInit,
} from '@angular/core';

import { DbProcedureMessages } from '../../db/messages';
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
      message: DbProcedureMessages.GET_EMPLOYEES,
    });

    this.#srvDb.dbChannel.onmessage = ({ data }) => {
      console.log(data);
    };
  }
}
