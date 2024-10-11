import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DbService {
  dbChannel!: Worker;

  initDb = () => {
    if (typeof Worker !== 'undefined') {
      this.dbChannel = new Worker(new URL('../../db.worker', import.meta.url), {
        credentials: 'same-origin',
        type: 'module',
      });
    }
  };
}
