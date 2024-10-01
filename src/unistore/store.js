import createStore from 'unistore';
import { initialStore } from './initialStore';

const store = createStore(initialStore);

export default store;