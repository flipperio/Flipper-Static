import { createStore } from 'redux';
import reducer from './reducers/index.js';
import state from './state.js';

const store = createStore(reducer, state);

export default store;
