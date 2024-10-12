/// <reference lib="webworker" />

import type { OpType } from './@types';
import { personDbOps } from './app/db/tinybase';

addEventListener(
  'message',
  ({ data }: MessageEvent<{ message: OpType; data: never }>) => {
    try {
      const reply = personDbOps(data);

      postMessage({
        message: data.message,
        data: reply,
      });
    } catch (e) {
      postMessage({
        message: 'error',
        data: e,
      });
    }
  }
);
