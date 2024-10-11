/// <reference lib="webworker" />

import { createStore } from 'tinybase';

const store = createStore();

addEventListener('message', ({ data }) => {
  const response = `worker response to ${data}`;
  console.dir(store);
  postMessage(response);
});
