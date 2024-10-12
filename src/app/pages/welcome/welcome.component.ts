import type { OnInit } from '@angular/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import type { MealType } from '../../../@types';
import { DbOp } from '../../db/constants';
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
      message: DbOp.SAVE_MEAL,
      data: {
        mealRef: 'rice',
        type: 'food',
        name: 'Rice',
        price: 12.45,
      } as Omit<MealType, 'isAvailable'>,
    });

    this.#srvDb.dbChannel.postMessage({
      message: DbOp.QUERY_MEAL,
      data: 'food',
    });

    this.#srvDb.dbChannel.onmessage = ({ data }) => {
      console.log(data);
    };
  }
}
