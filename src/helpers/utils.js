import { store } from '../unistore'

export const shuffleArray = (array) => {
  let newArray = array.slice();
  for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
  }
  return newArray;
};

export function getItem (key, cb) {
  let data = null;
  try {
    data = window.localStorage.getItem(key);
    data = JSON.parse(data);
  } catch (err) {
    cb && cb(data);
    return data;
  } finally {
    cb && cb(data);
    return data;
  }
}

export function setItem (key, value) {
  window.localStorage.setItem(
    key,
    typeof value !== 'string' ? JSON.stringify(value) : value || null
  );
}

export function componentModal (data) {
  store.setState({
    componentModal: data
  })
}