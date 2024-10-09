import store from './store';
import { setItem } from '../helpers'
import { initialStore } from './initialStore';

function syncDataToStorage (newState) {
  Object.keys(newState).forEach((key) => {
    if (disabledStorageKeys.indexOf(key) > -1 || !(key in initialStore)) {

    } else {
      setItem(key, newState[key]);
    }
  });
}

const disabledStorageKeys = [];
let persistTimeout = 0;
let persistedData = {};
function persistData (newState) {
  // @ clear timer or stop the previous request
  if (persistTimeout !== 0) {
    clearTimeout(persistTimeout);
    persistTimeout = 0;
  }

  // @ save persisted keys
  for (const key of Object.keys(newState)) {
    if (!disabledStorageKeys.find((i) => i === key)) {
      persistedData[key] = newState[key];
    }
  }

  // @ start timer to sync to storage
  persistTimeout = setTimeout(() => {
    // @ save to storage
    syncDataToStorage(persistedData);
    persistedData = {};
  }, 200);
}

export function updateStore (newState) {
  persistData(newState);
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
