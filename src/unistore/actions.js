import store from './store';
import { initialStore } from './initialStore';

export function updateStore (newState) {
  store.setState(newState);
}

export function resetStore (cb) {
  try {
    updateStore(initialStore);
    if (cb) {
      cb();
    }
  } catch (err) {
    console.error('clear data error.', err);
  }
}
