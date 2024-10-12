/// <reference lib="webworker" />

import { DbProcedureMessageType } from './app/db/messages';
import { personDbOps } from './app/db/tinybase';

addEventListener(
  'message',
  ({
    data,
  }: MessageEvent<{ message: DbProcedureMessageType; data: never }>) => {
    const reply = personDbOps(data);

    postMessage({
      message: data.message,
      data: reply,
    });
  }
);
